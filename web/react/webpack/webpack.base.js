const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	// Tell webpack to run babel on every file it runs through
	module: {
		rules: [
			{
				test: /\.js?$/, // only on js files
				loader: 'babel-loader', // run babel with this loader
				exclude: '/node_modules/', // do not run babel on files inside this directory
				options: {
					presets: [
						'react', // run react
						'stage-0', //async code
						['env',
							{
								targets: { browsers: ['last 2 versions'] },
								debug: false
							}
						] //make code all work for all browsers last 2 versions
					],
					plugins: ['syntax-dynamic-import', 'transform-class-properties'],
					compact: false
				}
			}
		]
	},
	plugins: [
		new UglifyJSPlugin({ extractComments: true })
	]
};
