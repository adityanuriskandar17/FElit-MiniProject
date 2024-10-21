const { environment } = require('@rails/webpacker')

environment.loaders.append('babel', {
    test: /\.js$/,
    use: ['babel-loader']
  })
  
module.exports = environment
