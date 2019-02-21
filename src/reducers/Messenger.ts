import { initState } from '.'
import { MessengerActions } from '../actions/Messenger'
import { SignActions } from '../actions/Sign'
import { IMultiDataState } from '../types'
import { IMessage, IMessenger, IParticipant, IThread } from '../types/messenger'
import { arraysEqual } from '../utils'

const MessengerReducer = (
  messenger: IMultiDataState<IMessenger>,
  action: MessengerActions | SignActions
) => {
  switch (action.type) {
    case 'CLOSE_THREAD':
      return {
        ...messenger,
        data: {
          ...messenger.data,
          openThreads:
            messenger.data.openThreads.indexOf(action.payload as number) > -1
              ? messenger.data.openThreads.filter(x => x !== action.payload)
              : messenger.data.openThreads,
          threads:
            messenger.data.threads && !action.payload
              ? messenger.data.threads.filter(x => x.id)
              : messenger.data.threads,
        },
      }
    case 'OPEN_THREAD':
      return {
        ...messenger,
        data: {
          ...messenger.data,
          openThreads:
            messenger.data.openThreads.indexOf(action.payload as number) > -1
              ? messenger.data.openThreads.slice()
              : messenger.data.openThreads.concat([action.payload as number]),
        },
      }
    case 'GET_THREADS_REQUEST':
      return {
        ...messenger,
        done: false,
        loading: true,
      }
    case 'GET_THREADS_FAILURE':
      return {
        ...messenger,
        done: false,
        error: action.payload as Error,
        loading: false,
      }
    case 'GET_THREADS_SUCCESS':
      return {
        ...messenger,
        data: {
          ...messenger.data,
          threads: action.payload as IThread[],
        },
        done: false,
        error: undefined,
        loading: false,
      }
    case 'GET_THREAD_REQUEST':
      return {
        ...messenger,
        done: false,
        loading: true,
      }
    case 'GET_THREAD_FAILURE':
      return {
        ...messenger,
        done: false,
        error: action.payload as Error,
        loading: false,
      }
    case 'GET_THREAD_SUCCESS':
      const existingThread = messenger.data.threads
        ? (action.payload as IThread).id === undefined
          ? messenger.data.threads.find(x =>
              arraysEqual(
                (x.participants as IParticipant[]).map(y => y.userId).sort(),
                ((action.payload as IThread).participants as IParticipant[])
                  .map(y => y.userId)
                  .sort()
              )
            )
          : messenger.data.threads.find(
              x => x.id === (action.payload as IThread).id
            )
        : undefined

      return {
        ...messenger,
        data: messenger.data.threads
          ? {
              ...messenger.data,
              openThreads: existingThread
                ? messenger.data.openThreads.indexOf(existingThread.id) > -1
                  ? messenger.data.openThreads.slice()
                  : messenger.data.openThreads.concat(existingThread.id)
                : (action.payload as IThread).id === undefined
                ? messenger.data.openThreads.slice()
                : messenger.data.openThreads.concat(
                    (action.payload as IThread).id
                  ),
              threads: existingThread
                ? messenger.data.threads.slice()
                : messenger.data.threads.concat([action.payload as IThread]),
            }
          : messenger.data,
        done: false,
        error: undefined,
        loading: false,
      }
    case 'CREATE_THREAD_REQUEST':
      return {
        ...messenger,
        done: false,
        loading: true,
      }
    case 'CREATE_THREAD_FAILURE':
      return {
        ...messenger,
        done: false,
        error: action.payload as Error,
        loading: false,
      }
    case 'CREATE_THREAD_SUCCESS':
      return {
        ...messenger,
        data: messenger.data.threads
          ? {
              ...messenger.data,
              openThreads: messenger.data.openThreads.concat(
                (action.payload as IThread).id
              ),
              threads: messenger.data.threads
                .filter(x => x.id !== undefined)
                .concat([action.payload as IThread]),
            }
          : messenger.data,
        done: false,
        error: undefined,
        loading: false,
      }
    case 'GET_MESSAGES_REQUEST':
      return {
        ...messenger,
        done: false,
        loadingList: {
          ...messenger.loadingList,
          [action.payload as number]: true,
        },
      }
    case 'GET_MESSAGES_FAILURE':
      return {
        ...messenger,
        done: false,
        error: action.payload as Error,
        errorList: {
          ...messenger.errorList,
          [action.payload as number]: action.payload,
        },
        loadingList: {
          ...messenger.loadingList,
          [action.payload as number]: false,
        },
      }
    case 'GET_MESSAGES_SUCCESS':
      return {
        ...messenger,
        data: {
          ...messenger.data,
          threads: messenger.data.threads
            ? messenger.data.threads.map(x =>
                x.id ===
                (action.payload as { messages: IMessage[]; threadId: number })
                  .threadId
                  ? {
                      ...x,
                      messages: x.messages
                        ? [
                            ...(action.payload as {
                              messages: IMessage[]
                              threadId: number
                            }).messages,
                            ...x.messages,
                          ]
                        : (action.payload as {
                            messages: IMessage[]
                            threadId: number
                          }).messages,
                    }
                  : x
              )
            : undefined,
        },
        done: false,
        error: undefined,
        errorList: {
          ...messenger.errorList,
          [(action.payload as { messages: IMessage[]; threadId: number })
            .threadId]: undefined,
        },
        loadingList: {
          ...messenger.loadingList,
          [(action.payload as { messages: IMessage[]; threadId: number })
            .threadId]: false,
        },
      }
    case 'SEND_MESSAGE_REQUEST':
      return {
        ...messenger,
        done: false,
        loading: false,
      }
    case 'SEND_MESSAGE_FAILURE':
      return {
        ...messenger,
        done: false,
        error: action.payload as Error,
        loading: false,
      }
    case 'SEND_MESSAGE_SUCCESS':
      return {
        ...messenger,
        data: {
          ...messenger.data,
          openThreads:
            messenger.data.openThreads.indexOf(
              (action.payload as IMessage).thread.id
            ) > -1
              ? messenger.data.openThreads
              : messenger.data.openThreads.concat([
                  (action.payload as IMessage).thread.id,
                ]),
          threads: messenger.data.threads
            ? messenger.data.threads.map(x =>
                x.id === (action.payload as IMessage).thread.id &&
                messenger.data.openThreads.indexOf(
                  (action.payload as IMessage).thread.id
                ) > -1
                  ? {
                      ...x,
                      messages: x.messages
                        ? x.messages.concat([action.payload as IMessage])
                        : [action.payload as IMessage],
                    }
                  : x
              )
            : undefined,
        },
        done: false,
        error: undefined,
        loading: false,
      }
    case 'UN_NEW_THREAD_MESSAGES_REQUEST':
      return {
        ...messenger,
        done: false,
        loading: false,
      }
    case 'UN_NEW_THREAD_MESSAGES_FAILURE':
      return {
        ...messenger,
        done: false,
        error: action.payload as Error,
        loading: false,
      }
    case 'UN_NEW_THREAD_MESSAGES_SUCCESS':
      return {
        ...messenger,
        data: {
          ...messenger.data,
          threads: messenger.data.threads
            ? messenger.data.threads.map(x =>
                x.id === action.payload
                  ? {
                      ...x,
                      messages: x.messages.map(y => ({
                        ...y,
                        new: false,
                      })),
                      newMessage: false,
                    }
                  : x
              )
            : undefined,
        },
        done: false,
        error: undefined,
        loading: false,
      }
    case 'SIGN_OUT':
      return initState.messenger
    default:
      return messenger
  }
}

export default MessengerReducer
