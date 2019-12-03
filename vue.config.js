// ~/.vuerc or ./vue.config.js
const path = require('path')

const __DEV__ = process.env.NODE_ENV === 'development'
const __PROD__ = process.env.NODE_ENV === 'production'

// 环境变量
process.env.VUE_APP_VERSION = require('./package.json').version

// path.join(__dirname, 'src') 等效 path.resolve('./src')
function resolve(dir) {
  return path.join(__dirname, dir)
  // return path.resolve(dir)
}

module.exports = {
  publicPath: './',
  assetsDir: __DEV__ ? './' : './static',
  configureWebpack: config => {
    config.resolve.extensions.push('.css', '.styl', '.less', '.md')
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))

    /**
      第三方库提取（分四层）
      - config.optimization.delete('splitChunks') // 删除默认的
      - 将 vue 项目通用模块打包为 vue-lib，跨项目共享 cdn
        - 包含 vue, vue-router, vuex, axios, register-service-worker
      - 其他第三方库打包为 chunk-vendors
      - 项目公共代码打包为 chunk-common
      - 其他代码
      */

    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    config.optimization.splitChunks({
      // chunks: 'all', // 这些都使用默认
      // minSize: 60000, // byte, 30kb
      // maxSize: 0,
      // minChunks: 1,
      // maxAsyncRequests: 5,
      // maxInitialRequests: 3,
      // automaticNameDelimiter: '~',
      // automaticNameMaxLength: 30,
      cacheGroups: {
        // 抽取第三方模块, 使用 dll 替代: npm run dll, 如果要可视化分析, 可打开此配置查看输出
        // libs: {
        //   name: `chunk-lib`,
        //   test: /[\\/]node_modules[\\/](vue|vue-router|vuex|axios)[\\/]/,
        //   priority: 0,
        //   chunks: 'initial',
        // },
        vendors: {
          name: `chunk-vendors`,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial',
        },
        common: {
          name: `chunk-common`,
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true,
        },
      },
    })
  },
  // dll 方案, 使用 vue-cli-plugin-dll
  pluginOptions: {
    dll: {
      // 单入口
      // entry: ['vue', 'vue-router', 'vuex', 'axios', 'element-ui', 'nprogress'],
      // 多入口
      entry: {
        vue: ['vue', 'vue-router', 'vuex'], // core-js
        ui: ['element-ui', 'nprogress'],
      },
      output: path.join(__dirname, './public/dll'),
      // 只在生产环境加入 webpack.DllReferencePlugin 插件
      open: true, // __PROD__,
      inject: true,
    },
  },
  css: {
    // loaderOptions: {
    //   stylus: {
    //     // 全局引入变量
    //     import: path.resolve(__dirname, './src/style/var'),
    //     // data: `@import "~@/style/var";`, // 这样不行
    //   },
    // },
    // modules: false,
    sourceMap: !__PROD__,
  },
  productionSourceMap: !__PROD__,
  lintOnSave: !__PROD__,
  runtimeCompiler: false,
  crossorigin: 'anonymous',
  // transpileDependencies: [],

  // 子资源完整性（SRI）
  // https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
  integrity: false,
  // 代理设置
  devServer: {
    // overlay: {
    //   warnings: true,
    //   errors: true,
    // },
    port: 8086,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8086/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
