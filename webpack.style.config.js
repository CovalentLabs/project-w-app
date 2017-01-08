const config = require('./webpack.config')

// Change entry for styleguide pages!
config.entry['app'] = './src/main.style.ts'

module.exports = config
