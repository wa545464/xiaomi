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
    },
    productionSourceMap: false,
    // 使用() => import('index.vue')这种方式还不能完全实现预加载，要配置下面这句代码：
    chainWebpack: (config) => {
        config.plugins.delete('prefetch');
    }
}