module.exports = {
    configureWebpack: {
      devServer: {
        proxy: 'http://bskaurud.local.coschedule.ngrok.io/',
        headers: { 'Access-Control-Allow-Origin': '*' }
      }
    }
  }