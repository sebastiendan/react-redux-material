import * as dotenv from 'dotenv'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './config'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'

import './index.css'

dotenv.config()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
