const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
// const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    rules: [
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              fiber: require('fibers'),
              indentedSyntax: true // optional
            }
          }
        ]
      }
    ],
    plugins: [
      new VuetifyLoaderPlugin(),
      new BundleAnalyzerPlugin(),
    ],
    pluginOptions: {
      webpackBundleAnalyzer: {
        openAnalyzer: false
      }
    }
  }