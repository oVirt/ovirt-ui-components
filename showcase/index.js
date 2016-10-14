import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

require('patternfly/dist/js/patternfly')

import 'patternfly/dist/css/patternfly.css'
import 'patternfly/dist/css/patternfly-additions.css'

import { Dummy } from 'ovirt-ui-components'

import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <Dummy />
  </Provider>,
  document.getElementById('app')
)
