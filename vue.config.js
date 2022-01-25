module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  outputDir: 'docs',
  transpileDependencies: [
    'vuetify'
  ]
}
