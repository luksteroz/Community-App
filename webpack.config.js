//Konfiguracja Webpack
module.exports = {
    entry: "./js/App.jsx",
    output: { filename: "./js/out.js" },
    devServer:  {
			    inline:	true,
				contentBase:	'./',
				port:	3001,
		        },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.jsx$/,  exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    plugins: ['transform-decorators-legacy' ],
                    presets: ['es2015', 'stage-2', 'react'],
                 }
            }
        ]
    }
}
