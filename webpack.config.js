const baseConfig = {
  mode: 'none', // TODO we will set up dev/production configs at a later date; same mode for dev/prod until then.
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
        use: { loader: 'babel-loader' }
      }
    ]
  },
  resolve: {
    alias: {
      components: __dirname + '/src/client/components',
      containers: __dirname + '/src/client/containers',
      static: __dirname + '/src/client/static',
      lib: __dirname + '/src/client/lib',
      src: __dirname + '/src/client/',
      styles: __dirname + '/src/client/styles'
    },
    extensions: ['.js', '.jsx']
  }
}

module.exports = [
  // CLIENT
  {
    ...baseConfig,
    target: 'web',
    entry: './src/client/index.js',
    output: {
      filename: 'client.js',
      path: __dirname + '/dist'
    }
  },

  // SERVER
  {
    ...baseConfig,
    target: 'node',
    entry: './src/server/index.js',
    output: {
      filename: 'server.js',
      path: __dirname + '/dist'
    }
  }
]
