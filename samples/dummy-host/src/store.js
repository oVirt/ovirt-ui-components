import { createStore, combineReducers } from 'redux'
import { DummyReducer as dummy } from 'ovirt-ui-components'

const reducer = combineReducers({ dummy })

export default createStore(reducer)
