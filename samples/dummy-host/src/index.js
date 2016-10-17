import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'

// Patternfly dependencies
// jQuery needs to be globally available (webpack.ProvidePlugin can be also used for this)
window.$ = window.jQuery = require('jquery')
require('patternfly/dist/js/patternfly')

import 'patternfly/dist/css/patternfly.css'
import 'patternfly/dist/css/patternfly-additions.css'

import './index.css'

import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
