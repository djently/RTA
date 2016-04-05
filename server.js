const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

/* Webpack middleware */
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);

// Create the app, setup the webpack middleware
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
}));
app.use(require('webpack-hot-middleware')(compiler));

/* app code */

app.use(express.static('public'));

server.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

io.on('connection', function(socket) {
    socket.emit('news', {hello: 'world'});
    socket.on('my other event', function(data) {
        console.log(data);
    });
});
