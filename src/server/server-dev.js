import path from 'path'
import express from 'express'
import http from 'http'
import ioPackage from 'socket.io';
import session from 'express-session';
import sharedsession from 'express-socket.io-session';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack.dev.js'

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
    console.log('a user connected');

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
        console.log('user disconnected');
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
            players[playerData.playerId].rotation = playerData.rotation;

            // emit a message to all players about the player that moved
            socket.to('snake_game').broadcast.emit('playerChangedDirection', players[playerData.playerId]);
        }
    );

    socket.on(
        'playerMovement',
        function (playerData) {
            try {
                players[playerData.playerId].x = playerData.x;
                players[playerData.playerId].y = playerData.y;

                socket.to('snake_game').broadcast.emit('playerPositionChanged', players[playerData.playerId]);
            } catch (err) {
                console.warn(err)
            }

        }
    )

    socket.on(
        'snakeGrow',
        function (playerData) {
            players[playerData.playerId].tails = playerData.tails

            socket.to('snake_game').broadcast.emit('playerGrew', players[playerData.playerId]);
        }
    )

    socket.on(
        'snakeShrink',
        function (playerData) {
            players[playerData.playerId].tails = playerData.tails

            socket.to('snake_game').broadcast.emit('playerShrank', players[playerData.playerId]);
        }
    )

    socket.on(
        'repositionItems',
        function (itemData) {
            socket.to('snake_game').broadcast.emit('repositionAllItems', itemData)
        }
    )
});
