const PORT = 3010;

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path');
const chalk = require('chalk');
const ip = require('ip');

const app = express();
const config = require('./webpack.config.development');
const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, { publicPath: config.output.publicPath }),
);

app.get('*', (_, res) => {
  compiler.outputFileSystem.readFile(
    path.join(compiler.outputPath, 'index.html'),
    (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    },
  );
});

app.listen(PORT, () => {
  console.log(`Server started ! ${chalk.green('✓')}`);
  console.log(`
  ${chalk.bold('Access URLs:')}
  ${chalk.gray('-----------------------------------')}
  Localhost: ${chalk.magenta(`http://localhost:${PORT}`)}
        LAN: ${chalk.magenta(`http://${ip.address()}:${PORT}`)}
  ${chalk.gray('-----------------------------------')}
  ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
  `);
});
