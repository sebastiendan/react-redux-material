import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import * as userActions from '../actions/User'
import Header from '../components/Header'
import IStoreState from '../types'

export function mapStateToProps({ location, user }: IStoreState) {
  return {
    location,
    user,
  }
}

export function mapDispatchToProps(
  dispatch: Dispatch<userActions.UserActions>
) {
  return {
    getAvatar: () => dispatch(userActions.getAvatar()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
