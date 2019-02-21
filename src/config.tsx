import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'
import { socket } from './socket'

export const history = createBrowserHistory()

export const store = createStore(
  connectRouter(history)(rootReducer),
  compose(
    applyMiddleware(
      thunk.withExtraArgument(socket.emit),
      routerMiddleware(history)
    )
  )
)
