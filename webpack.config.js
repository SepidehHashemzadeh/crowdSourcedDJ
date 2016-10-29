var config = {
   entry: './main.js',
	
   output: {
      path:'./',
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      port: 8080
   },

   node: {
      fs: "empty"
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
				
            query: {
               presets: ['es2015', 'react']
            }
         },
         {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
               'file?hash=sha512&digest=hex&name=[hash].[ext]',
               'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
         },
         { 
            test: /\.css$/, loader: "style-loader!css-loader" 
         },
         { 
            test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, 
            loader: 'file-loader?name=fonts/[name].[ext]' 
         }
      ]
   }
}

module.exports = config;