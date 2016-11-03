var config = {
   entry: './main.js',
	
   output: {
      path:'./',
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      port: 8080,
      headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
         "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }
   },

   node: {
      fs: "empty",
      dns: "empty"
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
            test: /\.css$/,
            loader: "style-loader!css-loader" 
         },
         { 
            test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, 
            loader: 'file-loader?name=fonts/[name].[ext]' 
         },
         { 
            test: /\.txt(\?.*)?$/,
            loader: "inconv-lite?inputEncoding=iso-8859-1"
         },
         { 
            test: /\.json$/,
            loader: "json-loader"
         }
      ]
   }
}

module.exports = config;