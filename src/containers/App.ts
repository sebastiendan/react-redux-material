import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import * as signActions from '../actions/Sign'
import App from '../components/App'
import IStoreState from '../types'

export function mapStateToProps({ user }: IStoreState) {
  return {
    user,
  }
}

export function mapDispatchToProps(
  dispatch: Dispatch<signActions.SignActions>
) {
  return {
    getUserByToken: (token: string) =>
      dispatch(signActions.getUserByToken(token)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
