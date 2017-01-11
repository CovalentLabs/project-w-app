const config = require('./webpack.config')

// Change entry for styleguide pages!
config.entry['app'] = './src/main.style.ts'

var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';
config.devtool = isProd ? 'source-map' : 'cheap-module-eval-source-map'

module.exports = config
