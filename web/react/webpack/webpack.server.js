const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const config = {
	// Inform webpack that we're building a bundle for NodeJS rather than browser
	target: 'node',
	// Tell webpack the root file of our server application
	entry: './src/server/index.js',
	//  Tell webpack where to put the output file that is generated
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './../build/server')
	},
	module: {
		rules: [
	  		{ test: /\.(scss|png|jpg)$/, loader: 'ignore-loader' }
		]
	},
	plugins: [
		new webpack.DefinePlugin({
	      __isBrowser__: "false"
	    })
    ],
	// tell webpack to not bundle any libraries into the output bundle in server if it already exists in the node modules
	externals: [webpackNodeExternals()]
};


module.exports = merge(baseConfig, config);