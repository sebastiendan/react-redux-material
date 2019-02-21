import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import * as messengerActions from '../actions/Messenger'
import Messenger from '../components/Messenger'
import IStoreState from '../types'

export function mapStateToProps({ messenger, user }: IStoreState) {
  return {
    messenger,
    user,
  }
}

export function mapDispatchToProps(
  dispatch: Dispatch<messengerActions.MessengerActions>
) {
  return {
    getThreads: () => dispatch(messengerActions.getThreads()),
    openThread: (id: number) => dispatch(messengerActions.openThread(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messenger)
