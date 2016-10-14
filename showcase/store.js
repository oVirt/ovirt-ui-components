import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { DummyReducer as dummy } from 'ovirt-ui-components'

export const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({ dummy })

export default createStore(reducer, applyMiddleware(sagaMiddleware))
