import axios from 'axios'
import { Dispatch } from 'redux'

import * as constants from '../constants/Messenger'
import IStoreState, { IPagination } from '../types'
import {
  ICreateMessageDto,
  ICreateThreadDto,
  IMessage,
  IThread,
} from '../types/messenger'

export interface IMessengerActions {
  type:
    | constants.GET_THREAD_REQUEST
    | constants.GET_THREAD_FAILURE
    | constants.GET_THREAD_SUCCESS
    | constants.CREATE_THREAD_REQUEST
    | constants.CREATE_THREAD_FAILURE
    | constants.CREATE_THREAD_SUCCESS
    | constants.GET_THREADS_REQUEST
    | constants.GET_THREADS_FAILURE
    | constants.GET_THREADS_SUCCESS
    | constants.GET_MESSAGES_REQUEST
    | constants.GET_MESSAGES_FAILURE
    | constants.GET_MESSAGES_SUCCESS
    | constants.SEND_MESSAGE_REQUEST
    | constants.SEND_MESSAGE_FAILURE
    | constants.SEND_MESSAGE_SUCCESS
    | constants.UN_NEW_THREAD_MESSAGES_REQUEST
    | constants.UN_NEW_THREAD_MESSAGES_FAILURE
    | constants.UN_NEW_THREAD_MESSAGES_SUCCESS
    | constants.OPEN_THREAD
    | constants.CLOSE_THREAD
    | constants.SEND_MESSAGE
  payload?:
    | number
    | IMessage
    | { messages: IMessage[]; threadId: number }
    | IThread
    | IThread[]
    | Error
    | { threadId: number; error: Error }
}

export function getThreadRequest(): IMessengerActions {
  return {
    type: constants.GET_THREAD_REQUEST,
  }
}

export function getThreadFailure(err: Error): IMessengerActions {
  return {
    payload: err,
    type: constants.GET_THREAD_FAILURE,
  }
}

export function getThreadSuccess(thread: IThread): IMessengerActions {
  return {
    payload: thread,
    type: constants.GET_THREAD_SUCCESS,
  }
}

export function getThread(recipientUserId: number): any {
  return (
    dispatch: Dispatch<IMessengerActions>,
    getState: () => IStoreState
  ) => {
    dispatch(getThreadRequest())
    const state = getState()

    axios
      .get(`API_URL/message/thread/${recipientUserId}`, {
        headers: {
          Authorization: `Bearer ${state.user ? state.user.data.token : ''}`,
        },
      })
      .then(res => {
        const thread = res.data
        dispatch(getThreadSuccess(thread))
      })
      .catch(err => {
        dispatch(getThreadFailure(err))
      })
  }
}

export function createThreadRequest(): IMessengerActions {
  return {
    type: constants.CREATE_THREAD_REQUEST,
  }
}

export function createThreadFailure(err: Error): IMessengerActions {
  return {
    payload: err,
    type: constants.CREATE_THREAD_FAILURE,
  }
}

export function createThreadSuccess(thread: IThread): IMessengerActions {
  return {
    payload: thread,
    type: constants.CREATE_THREAD_SUCCESS,
  }
}

export function createThread(createThreadDto: ICreateThreadDto): any {
  return (
    dispatch: Dispatch<IMessengerActions>,
    getState: () => IStoreState,
    emit: (type: string, payload?: any) => void
  ) => {
    dispatch(createThreadRequest())
    const state = getState()

    axios
      .post(`API_URL/message/thread`, createThreadDto, {
        headers: {
          Authorization: `Bearer ${state.user ? state.user.data.token : ''}`,
        },
      })
      .then(res => {
        const thread = res.data
        emit(constants.CREATE_THREAD_SUCCESS, thread)
        dispatch(getMessages(thread.id))
        dispatch(createThreadSuccess(thread))
      })
      .catch(err => {
        dispatch(createThreadFailure(err))
      })
  }
}

export function getThreadsRequest(): IMessengerActions {
  return {
    type: constants.GET_THREADS_REQUEST,
  }
}

export function getThreadsFailure(err: Error): IMessengerActions {
  return {
    payload: err,
    type: constants.GET_THREADS_FAILURE,
  }
}

export function getThreadsSuccess(threads: IThread[]): IMessengerActions {
  return {
    payload: threads,
    type: constants.GET_THREADS_SUCCESS,
  }
}

export function getThreads(): any {
  return (
    dispatch: Dispatch<IMessengerActions>,
    getState: () => IStoreState
  ) => {
    dispatch(getThreadsRequest())
    const state = getState()

    axios
      .get(`API_URL/message/threads`, {
        headers: {
          Authorization: `Bearer ${state.user ? state.user.data.token : ''}`,
        },
      })
      .then(res => {
        const threads = res.data
        dispatch(getThreadsSuccess(threads))
      })
      .catch(err => {
        dispatch(getThreadsFailure(err))
      })
  }
}

export function getMessagesRequest(threadId: number): IMessengerActions {
  return {
    payload: threadId,
    type: constants.GET_MESSAGES_REQUEST,
  }
}

export function getMessagesFailure(
  threadId: number,
  error: Error
): IMessengerActions {
  return {
    payload: { threadId, error },
    type: constants.GET_MESSAGES_FAILURE,
  }
}

export function getMessagesSuccess(data: {
  messages: IMessage[]
  threadId: number
}): IMessengerActions {
  return {
    payload: data,
    type: constants.GET_MESSAGES_SUCCESS,
  }
}

export function getMessages(threadId: number, pagination?: IPagination): any {
  return (
    dispatch: Dispatch<IMessengerActions>,
    getState: () => IStoreState
  ) => {
    dispatch(getMessagesRequest(threadId))
    const state = getState()

    axios
      .get(
        `API_URL/message/messages/${threadId}${
          pagination ? `?skip=${pagination.skip}&take=${pagination.take}` : ''
        }`,
        {
          headers: {
            Authorization: `Bearer ${state.user ? state.user.data.token : ''}`,
          },
        }
      )
      .then(res => {
        const messages = res.data
        dispatch(getMessagesSuccess({ messages, threadId }))
      })
      .catch(err => {
        dispatch(getMessagesFailure(threadId, err))
      })
  }
}

export function sendMessageRequest(): IMessengerActions {
  return {
    type: constants.SEND_MESSAGE_REQUEST,
  }
}

export function sendMessageFailure(err: Error): IMessengerActions {
  return {
    payload: err,
    type: constants.SEND_MESSAGE_FAILURE,
  }
}

export function sendMessageSuccess(data: {
  messages: IMessage[]
  threadId: number
}): IMessengerActions {
  return {
    payload: data,
    type: constants.SEND_MESSAGE_SUCCESS,
  }
}

export function sendMessage(createMessageDto: ICreateMessageDto): any {
  return (
    dispatch: Dispatch<IMessengerActions>,
    getState: () => IStoreState,
    emit: (type: string, payload?: any) => void
  ) => {
    dispatch(sendMessageRequest())
    const state = getState()

    axios
      .post(`API_URL/message/send`, createMessageDto, {
        headers: {
          Authorization: `Bearer ${state.user ? state.user.data.token : ''}`,
        },
      })
      .then(res => {
        const message = res.data
        emit(constants.SEND_MESSAGE_SUCCESS, message)
        dispatch(sendMessageSuccess(message))
      })
      .catch(err => {
        dispatch(sendMessageFailure(err))
      })
  }
}

export function unNewThreadMessagesRequest(): IMessengerActions {
  return {
    type: constants.UN_NEW_THREAD_MESSAGES_REQUEST,
  }
}

export function unNewThreadMessagesFailure(err: Error): IMessengerActions {
  return {
    payload: err,
    type: constants.UN_NEW_THREAD_MESSAGES_FAILURE,
  }
}

export function unNewThreadMessagesSuccess(
  threadId: number
): IMessengerActions {
  return {
    payload: threadId,
    type: constants.UN_NEW_THREAD_MESSAGES_SUCCESS,
  }
}

export function unNewThreadMessages(threadId: number): any {
  return (
    dispatch: Dispatch<IMessengerActions>,
    getState: () => IStoreState
  ) => {
    dispatch(unNewThreadMessagesRequest())
    const state = getState()

    axios
      .patch(
        `API_URL/message/unnew`,
        { threadId },
        {
          headers: {
            Authorization: `Bearer ${state.user ? state.user.data.token : ''}`,
          },
        }
      )
      .then(res => {
        dispatch(unNewThreadMessagesSuccess(threadId))
      })
      .catch(err => {
        dispatch(unNewThreadMessagesFailure(err))
      })
  }
}

export function closeThread(threadId: number): IMessengerActions {
  return {
    payload: threadId,
    type: constants.CLOSE_THREAD,
  }
}

export function openThread(threadId: number): IMessengerActions {
  return {
    payload: threadId,
    type: constants.OPEN_THREAD,
  }
}

export type MessengerActions = IMessengerActions
