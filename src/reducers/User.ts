import * as cookies from 'js-cookie'

import { SignActions } from '../actions/Sign'
import { UserActions } from '../actions/User'
import { socket } from '../socket'
import { IDataState } from '../types'
import { IUser, IUserInfos } from '../types/user'

const UserReducer = (
  user: IDataState<IUserInfos> | undefined,
  action: UserActions | SignActions
) => {
  switch (action.type) {
    case 'GET_USER_BY_TOKEN_REQUEST':
      return {
        ...(user as IDataState<IUserInfos>),
        error: undefined,
        loading: true,
      }
    case 'GET_USER_BY_TOKEN_FAILURE':
      cookies.remove('auth-token')
      return undefined
    case 'GET_USER_BY_TOKEN_SUCCESS':
      socket.init((action.payload as IUserInfos).token as string)
      return {
        ...(user as IDataState<IUserInfos>),
        data: action.payload as IUserInfos,
        error: undefined,
        loading: false,
      }
    case 'SIGN_IN_REQUEST':
      return {
        ...(user as IDataState<IUserInfos>),
        data: { user: undefined, token: undefined },
        error: undefined,
        loading: true,
      }
    case 'SIGN_IN_FAILURE':
      return {
        ...(user as IDataState<IUserInfos>),
        error: action.payload as Error,
        loading: false,
      }
    case 'SIGN_IN_SUCCESS':
      socket.init((action.payload as IUserInfos).token as string)
      cookies.set(
        'auth-token',
        (action.payload as IUserInfos).token as string,
        {
          expires: 30,
          secure: location.hostname !== 'localhost',
        }
      )
      return {
        ...(user as IDataState<IUserInfos>),
        data: action.payload as IUserInfos,
        error: undefined,
        loading: false,
      }
    case 'SIGN_UP_REQUEST':
      return {
        ...(user as IDataState<IUserInfos>),
        data: { user: undefined, token: undefined },
        error: undefined,
        loading: true,
      }
    case 'SIGN_UP_FAILURE':
      return {
        ...(user as IDataState<IUserInfos>),
        error: action.payload as Error,
        loading: false,
      }
    case 'SIGN_UP_SUCCESS':
      socket.init((action.payload as IUserInfos).token as string)
      cookies.set(
        'auth-token',
        (action.payload as IUserInfos).token as string,
        {
          expires: 30,
          secure: location.hostname !== 'localhost',
        }
      )
      return {
        ...(user as IDataState<IUserInfos>),
        data: action.payload as IUserInfos,
        error: undefined,
        loading: false,
      }
    case 'SIGN_OUT':
      cookies.remove('auth-token')
      return undefined
    case 'GET_AVATAR_REQUEST':
      return {
        ...(user as IDataState<IUserInfos>),
        error: undefined,
        loading: true,
      }
    case 'GET_AVATAR_FAILURE':
      return {
        ...(user as IDataState<IUserInfos>),
        error: action.payload as Error,
        loading: false,
      }
    case 'GET_AVATAR_SUCCESS':
      return {
        ...(user as IDataState<IUserInfos>),
        data: user
          ? {
              ...(user.data as IUserInfos),
              user: {
                ...(user.data.user as IUser),
                avatar: action.payload as Express.Multer.File,
              },
            }
          : { user: undefined, token: undefined },
        error: undefined,
        loading: false,
      }
    case 'UPDATE_AVATAR_REQUEST':
      return {
        ...(user as IDataState<IUserInfos>),
        error: undefined,
        loading: true,
      }
    case 'UPDATE_AVATAR_FAILURE':
      return {
        ...(user as IDataState<IUserInfos>),
        error: action.payload as Error,
        loading: false,
      }
    case 'UPDATE_AVATAR_SUCCESS':
      return {
        ...(user as IDataState<IUserInfos>),
        data: user
          ? {
              ...(user.data as IUserInfos),
              user: {
                ...(user.data.user as IUser),
                avatar: action.payload as Express.Multer.File,
              },
            }
          : { user: undefined, token: undefined },
        error: undefined,
        loading: false,
      }
    default:
      return user
  }
}

export default UserReducer
