import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import * as messengerActions from '../actions/Messenger'
import Thread from '../components/Thread'
import IStoreState, { IPagination } from '../types'
import { ICreateMessageDto, ICreateThreadDto } from '../types/messenger'

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
    closeThread: (threadId: number) =>
      dispatch(messengerActions.closeThread(threadId)),
    createThread: (createThreadDto: ICreateThreadDto) =>
      dispatch(messengerActions.createThread(createThreadDto)),
    getMessages: (threadId: number, pagination?: IPagination) =>
      dispatch(
        pagination
          ? messengerActions.getMessages(threadId, pagination)
          : messengerActions.getMessages(threadId)
      ),
    sendMessage: (message: ICreateMessageDto) =>
      dispatch(messengerActions.sendMessage(message)),
    unNewThreadMessages: (threadId: number) =>
      dispatch(messengerActions.unNewThreadMessages(threadId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Thread)
