import { connect } from 'react-redux'

import UserAvatar from '../components/UserAvatar'
import IStoreState from '../types'

export function mapStateToProps({ user }: IStoreState) {
  return {
    user,
  }
}

export default connect(mapStateToProps)(UserAvatar)
