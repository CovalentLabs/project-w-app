const config = require('./webpack.config')

// Change entry for styleguide pages!
config.entry['app'] = './src/main.style.ts'
config.devtool = 'inline-source-map'

module.exports = config
