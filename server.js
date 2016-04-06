'use strict';

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

const port = process.env.PORT || 3000;

app.use(express.static('public'));

server.listen(port, function() {
  console.log('RTA is listening on port ' + port);
});

/* Sockets handler */
const sockets = require('./backend/sockets')(io);
