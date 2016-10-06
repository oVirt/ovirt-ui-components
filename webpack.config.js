function external (root, module) {
  return {
    root,
    commonjs: module,
    commonjs2: module,
    amd: module,
  }
}

module.exports = {
  entry: {
    'ovirt-ui-components': './src/index.js',
  },
  output: {
    path: './dist',
    filename: '[name].js',
    library: 'OvirtUI',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style!css?modules!postcss' },
    ],
  },
  resolve: {
    extensions: ['', '.js'],
  },
  externals: [
    external('React', 'react'),
    external('ReactDOM', 'react-dom'),
    external('ReactRedux', 'react-redux'),
    external('Redux', 'redux'),
    external('ReduxSaga', 'redux-saga'),
  ],
}
