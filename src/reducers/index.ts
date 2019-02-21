import * as cookies from 'js-cookie'

import IStoreState from '../types'
import LocationReducer from './Location'
import MessengerReducer from './Messenger'
import UserReducer from './User'

const tokenFromCookie: string | undefined = cookies.get('auth-token')

export const initState: IStoreState = {
  location: undefined,
  messenger: {
    data: {
      openThreads: [1],
      threads: [
        {
          createdAt: new Date(),
          id: 1,
          latestMessage: {
            content: 'Message 1',
            createdAt: new Date(),
            id: 1,
            new: true,
            participant: {
              createdAt: new Date(),
              id: 1,
              updatedAt: new Date(),
              userId: 1,
            },
            updatedAt: new Date(),
          } as any,
          messages: [
            {
              content: 'Message 1',
              createdAt: new Date(),
              id: 1,
              new: true,
              participant: {
                createdAt: new Date(),
                id: 1,
                updatedAt: new Date(),
                userId: 1,
              },
              updatedAt: new Date(),
            } as any,
          ],
          newMessage: true,
          participants: [
            {
              createdAt: new Date(),
              id: 1,
              updatedAt: new Date(),
              userId: 1,
            },
            {
              createdAt: new Date(),
              id: 2,
              updatedAt: new Date(),
              userId: 2,
            },
          ],
          updatedAt: new Date(),
        },
      ],
    },
    done: false,
    error: undefined,
    errorList: undefined,
    loading: false,
    loadingList: undefined,
  },
  router: undefined,
  user: tokenFromCookie
    ? {
        data: {
          token: tokenFromCookie,
          user: undefined,
        },
        done: false,
        error: undefined,
        loading: true,
      }
    : undefined,
}

export default function combined(state = initState, action: any) {
  return {
    location: LocationReducer(state.location, action),
    messenger: MessengerReducer(state.messenger, action),
    router: undefined,
    user: UserReducer(state.user, action),
  }
}
