const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
	// Tell webpack the root file of our server application
	entry: ['./src/client/client.js'],
	//  Tell webpack where to put the output file that is generated
	output: {
		filename: 'bundle.js',
		chunkFilename: '[name].js',
		path: path.resolve(__dirname, './../build/client/js'),
		publicPath: '/js/'
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendor: {
					name: 'vendor',
					chunks: 'initial',
					minChunks: 2
				}
			}
		}
	},
	module: {
		rules: [
			{
				// the file extension you want to target
				test: /\.scss$/,
				// an array of loaders to be used top happens last, bottom happens first
				use: [
					{ loader: MiniCSSExtractPlugin.loader },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' }
				]
			},
			{
				// target images
				test: /\.(jpg|gif|png|ico)$/,
				use: [
					{
						//
						loader: 'file-loader',
						options: {
							// name the file in the name of the file + extnsion in images folder
							name: './../assets/images/[name].[ext]'
						}
					}
				]
			},
			{
				// target videos
				test: /\.(mp4|mov)$/,
				use: [
					{
						//
						loader: 'file-loader',
						options: {
							// name the file in the name of the file + extnsion in images folder
							name: './../assets/videos/[name].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new BrowserSyncPlugin(
			// BrowserSync options
			{
				// browse to http://localhost:3000/ during development
				host: 'localhost',
				port: 4000,
				// proxy the Webpack Dev Server endpoint
				// (which should be serving on http://localhost:4000/)
				// through BrowserSync
				proxy: 'http://localhost:3000/'
			},
			// plugin options
			{
				// allow BrowserSync to reload the page
				reload: true
			}
		),
		new MiniCSSExtractPlugin({
			filename: '../css/bundle.css'
		}),
		new OptimizeCssAssetsPlugin(),
		new webpack.DefinePlugin({
			__isBrowser__: 'true'
		}),
		new CompressionPlugin({
			algorithm: 'gzip',
			exclude: /\.(jpg|gif|png|ico)$/
		}),
		new BrotliPlugin({
			test: /\.(js|css)$/,
		}),
		new BundleAnalyzerPlugin({
			generateStatsFile: false
		})
	]
};

module.exports = merge(baseConfig, config);
