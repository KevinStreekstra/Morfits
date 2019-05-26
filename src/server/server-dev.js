import path from 'path'
import express from 'express'
import http from 'http'
import ioPackage from 'socket.io';
import session from 'express-session';
import sharedsession from 'express-socket.io-session';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import winston from 'winston'
import dateFns from 'date-fns'
import config from '../../webpack.dev.js'

const logFormat = winston.format.printf(({ level, message, label, timestamp, extraInfo }) => (
    `${timestamp} ${level}: ${message} ${
        extraInfo ? `Extra info: ${JSON.stringify(extraInfo, null, 2)}` : ''
    }`
))

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.label({ label: 'DEV' }),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({
            stack: true
        }),
        winston.format.splat(),
        winston.format.json(),
        winston.format.prettyPrint(),
        logFormat
    ),
    exitOnError: false,
    transports: [
        new winston.transports.Console({ level: 'error' }),
        new winston.transports.File({ filename: `./logs/dev-combined-${dateFns.format(new Date(), 'YYYY-MM-DD')}.log` })
    ]
});

const app = express(),
    DIST_DIR = __dirname,
    HTML_FILE = path.join(DIST_DIR, 'index.html'),
    compiler = webpack(config)

const expressSession = session({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
});

const httpServer = http.Server(app);
const io = ioPackage(httpServer);
const players = {}

app.use(expressSession);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}))

// app.use(webpackHotMiddleware(compiler))

app.get('*', (req, res, next) => {
    compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
        if (err) {
            return next(err)
        }
        res.set('content-type', 'text/html')
        res.send(result)
        res.end()
    })
})

const PORT = process.env.PORT || 8080

httpServer.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})

io.use(sharedsession(expressSession, {
    autoSave:true
}));

io.on('connection', function(socket){
    logger.log({
        level: 'info',
        message: 'A user connected'
    })

    socket.on(
        'joinSnake',
        /**
         * @description Handling the request to join snake
         *
         * @param {Object} playerInfo - The player info
         * @param {string} playerInfo.playerId - The unique id of the player.
         * @param {number} playerInfo.rotation - The rotation of the player
         * @param {number} playerInfo.x - the x cords of the player.
         * @param {number} playerInfo.y - the y cords of the player.
         * @param {Object} playerInfo.tail - the tail cords
         * @param {number} playerInfo.tail.x - the x cords of the tail.
         * @param {number} playerInfo.tail.y - the y cords of the tail.
         */
        function (playerInfo) {
            logger.log({
                level: 'info',
                message: 'User joined Snake',
                extraInfo: {
                    playerInfo,
                    socketInfo: {
                        socketId: socket.id,
                        server: socket.handshake.headers
                    }
                }
            })

            players[playerInfo.playerId] = playerInfo
            players[playerInfo.playerId].socketId = socket.id

            socket.join('snake_game')
            socket.to('snake_game').broadcast.emit('newPlayer', players[playerInfo.playerId])
        }
    )

    // send the players object to the new player
    socket.emit('currentPlayers', players);

    // when a player disconnects, remove them from our players object
    socket.on('disconnect', function () {
        Object.keys(players).forEach(id => {
            if (players[id].socketId === socket.id) {
                socket.to('snake_game').broadcast.emit('disconnected', players[id]);

                delete players[id];
            }
        })
    });

    socket.on(
        'directionChange',
        /**
         * @param {Object} playerData
         * @param {string} playerData.playerId - the unique id of the player
         * @param {number} playerData.rotation - the angle of the player.
         */
        function (playerData) {
            try {
                if (players[playerData.playerId] !== undefined) {
                    players[playerData.playerId].rotation = playerData.rotation;

                    // emit a message to all players about the player that moved
                    socket.to('snake_game').broadcast.emit('playerChangedDirection', players[playerData.playerId]);
                } else {
                    socket.emit('playerShouldReconnect', playerData.playerId)
                    logger.log({
                        level: 'info',
                        message: 'Player send a broadcast event to other clients while not connected to the snake game.',
                        extraInfo: {
                            playerInfo: playerData,
                            socketInfo: {
                                socketId: socket.id,
                                server: socket.handshake.headers
                            },
                            currentPlayers: players
                        }
                    })
                }
            } catch (err) {
                logger.log({
                    level: 'error',
                    message: `directionChange ran in to a error: ${err}`,
                    extraInfo: {
                        error: err
                    }
                })
            }
        }
    );

    socket.on(
        'playerMovement',
        function (playerData) {
            try {
                if (players[playerData.playerId] !== undefined) {
                    players[playerData.playerId].x = playerData.x;
                    players[playerData.playerId].y = playerData.y;

                    socket.to('snake_game').broadcast.emit('playerPositionChanged', players[playerData.playerId]);
                } else {
                    socket.emit('playerShouldReconnect', playerData.playerId)
                    logger.log({
                        level: 'info',
                        message: 'Player send a broadcast event to other clients while not connected to the snake game.',
                        extraInfo: {
                            playerInfo: playerData,
                            socketInfo: {
                                socketId: socket.id,
                                server: socket.handshake.headers
                            },
                            currentPlayers: players
                        }
                    })
                }
            } catch (err) {
                logger.log({
                    level: 'error',
                    message: `playerMovement ran in to a error: ${err}`,
                    extraInfo: {
                        playerInfo: playerData,
                        socketInfo: {
                            socketId: socket.id,
                            server: socket.handshake.headers
                        },
                        currentPlayers: players,
                        error: err
                    }
                })
            }
        }
    )

    socket.on(
        'snakeGrow',
        function (playerData) {
            try {
                if (players[playerData.playerId] !== undefined) {
                    players[playerData.playerId].tails = playerData.tails

                    socket.to('snake_game').broadcast.emit('playerGrew', players[playerData.playerId]);
                } else {
                    socket.emit('playerShouldReconnect', playerData.playerId)
                    logger.log({
                        level: 'info',
                        message: 'Player send a broadcast event to other clients while not connected to the snake game.',
                        extraInfo: {
                            playerInfo: playerData,
                            socketInfo: {
                                socketId: socket.id,
                                server: socket.handshake.headers
                            },
                            currentPlayers: players
                        }
                    })
                }
            } catch (err) {
                logger.log({
                    level: 'error',
                    message: `snakeGrow ran in to a error: ${err}`,
                    extraInfo: {
                        playerInfo: playerData,
                        socketInfo: {
                            socketId: socket.id,
                            server: socket.handshake.headers
                        },
                        currentPlayers: players,
                        error: err
                    }
                })
            }
        }
    )

    socket.on(
        'snakeShrink',
        function (playerData) {
            try {
                if (players[playerData.playerId] !== undefined) {
                    players[playerData.playerId].tails = playerData.tails

                    socket.to('snake_game').broadcast.emit('playerShrank', players[playerData.playerId]);
                } else {
                    socket.emit('playerShouldReconnect', playerData.playerId)
                    logger.log({
                        level: 'info',
                        message: 'Player send a broadcast event to other clients while not connected to the snake game.',
                        extraInfo: {
                            playerInfo: playerData,
                            socketInfo: {
                                socketId: socket.id,
                                server: socket.handshake.headers
                            },
                            currentPlayers: players
                        }
                    })
                }
            } catch (err) {
                logger.log({
                    level: 'error',
                    message: `snakeShrink ran in to a error: ${err}`,
                    extraInfo: {
                        playerInfo: playerData,
                        socketInfo: {
                            socketId: socket.id,
                            server: socket.handshake.headers
                        },
                        currentPlayers: players,
                        error: err
                    }
                })
            }
        }
    )

    socket.on(
        'repositionItems',
        function (itemData) {
            try {
                socket.to('snake_game').broadcast.emit('repositionAllItems', itemData)
            } catch (err) {
                logger.log({
                    level: 'error',
                    message: `repositionItems ran in to a error: ${err}`,
                    extraInfo: {
                        itemData,
                        socketInfo: {
                            socketId: socket.id,
                            server: socket.handshake.headers
                        },
                        currentPlayers: players,
                        error: err
                    }
                })
            }
        }
    )

    socket.on(
        'playerDied',
        function (playerData) {
            try {
                socket.to('snake_game').broadcast.emit('aPlayerDied', playerData)
            } catch (err) {
                logger.log({
                    level: 'error',
                    message: `playerDied ran in to a error: ${err}`,
                    extraInfo: {
                        playerInfo: playerData,
                        socketInfo: {
                            socketId: socket.id,
                            server: socket.handshake.headers
                        },
                        currentPlayers: players,
                        error: err
                    }
                })
            }
        }
    )

    socket.on(
        'playerRespawned',
        function (playerData) {
            try {
                if (players[playerData.playerId] !== undefined) {
                    players[playerData.playerId].tails = 0;

                    socket.to('snake_game').broadcast.emit('aPlayerRespawned', playerData)
                } else {
                    logger.log({
                        level: 'info',
                        message: 'Player send a broadcast event to other clients while not connected to the snake game.',
                        extraInfo: {
                            playerInfo: playerData,
                            socketInfo: {
                                socketId: socket.id,
                                server: socket.handshake.headers
                            },
                            currentPlayers: players
                        }
                    })
                }
            } catch (err) {
                logger.log({
                    level: 'error',
                    message: `playerRespawned ran in to a error: ${err}`,
                    extraInfo: {
                        playerInfo: playerData,
                        socketInfo: {
                            socketId: socket.id,
                            server: socket.handshake.headers
                        },
                        currentPlayers: players,
                        error: err
                    }
                })
            }
        }
    )
});
