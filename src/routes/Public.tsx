import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router'

import LandingPage from '../components/LandingPage'
import Sign from '../containers/Sign'

const routes = (
  <Switch>
    <Route exact={true} path="/" component={LandingPage} />
    <Route path="/sign" component={Sign} />
    <Redirect to="/" />
  </Switch>
)

export default routes
