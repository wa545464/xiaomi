module.exports = {
    devServer: {
        open: true,
        proxy: {
            '/api': {
                changeOrigin: true,
                target: 'http://mi.futurefe.com',
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    }
}