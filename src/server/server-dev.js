import path from 'path'
import express from 'express'
import http from 'http'
import ioPackage from 'socket.io';
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack.dev.js'


const app = express(),
    DIST_DIR = __dirname,
    HTML_FILE = path.join(DIST_DIR, 'index.html'),
    compiler = webpack(config)

const httpServer = http.Server(app);
const io = ioPackage(httpServer);
const players = {}

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler))

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

io.on('connection', function(socket){
    console.log('a user connected');
    players[socket.id] = {
        rotation: 0,
        x: 12.5,
        y: 12.5,
        playerId: socket.id,
        tail: {
            x: 0,
            y: 0
        },
        team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue',
        body: []
    };

    // send the players object to the new player
    socket.emit('currentPlayers', players);
    // update all other players of the new player
    socket.broadcast.emit('newPlayer', players[socket.id]);

    // when a player disconnects, remove them from our players object
    socket.on('disconnect', function () {
        console.log('user disconnected');
        // remove this player from our players object
        delete players[socket.id];
        // emit a message to all players to remove this player
        io.emit('disconnect', socket.id);
    });

    socket.on('directionChange', function (directionData) {
        players[socket.id].rotation = directionData.rotation;
        // emit a message to all players about the player that moved
        socket.broadcast.emit('playerChangedDirection', players[socket.id]);
    });

    socket.on('playerMovement', function (movementData) {
        players[socket.id].x = movementData.x;
        players[socket.id].y = movementData.y;

        socket.broadcast.emit('playerPositionChanged', players[socket.id]);
    })

    socket.on('snakeGrow', function (growData) {
        players[socket.id].tail.x = growData.x;
        players[socket.id].tail.y = growData.y;
        players[socket.id].body.push(growData)

        socket.broadcast.emit('playerGrew', players[socket.id]);
    })
});
