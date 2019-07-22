module.exports = [{
  entry: './src/client/index.js',
  output: {
    filename: 'client.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.json5$/,
        use: ['json5-loader']
      },
      {
        test: /\.svg$/,
        use: ['svg-react-loader']
      },
      {
        test: /\.(png|gif|jpg)$/,
        use: ['file-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ]
            }
          }
        ]
      }
    ]
  },
  target: 'web'
},
{
  entry: './src/server/index.js',
  output: {
    filename: 'server.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.json5$/,
        use: ['json5-loader']
      },
      {
        test: /\.svg$/,
        use: ['svg-react-loader']
      },
      {
        test: /\.(png|gif|jpg)$/,
        use: ['file-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ]
            }
          }
        ]
      }
    ]
  },
  target: 'node'
}]
