import React from 'react'
import ReactDOM from 'react-dom'

require('patternfly/dist/js/patternfly')

import 'patternfly/dist/css/patternfly.css'
import 'patternfly/dist/css/patternfly-additions.css'

import { Dummy } from 'ovirt-ui-components'

ReactDOM.render(
  <Dummy />,
  document.getElementById('app')
)
