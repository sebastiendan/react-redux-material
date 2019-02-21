import axios from 'axios'
import { Dispatch } from 'redux'

import * as constants from '../constants/Sign'
import {
  ISignInByEmail,
  ISignUpByEmail,
  IUserInfos,
  UserRoles,
} from '../types/user'

export interface ISignActions {
  type:
    | constants.GET_USER_BY_TOKEN_REQUEST
    | constants.GET_USER_BY_TOKEN_SUCCESS
    | constants.GET_USER_BY_TOKEN_FAILURE
    | constants.SIGN_IN_REQUEST
    | constants.SIGN_IN_SUCCESS
    | constants.SIGN_IN_FAILURE
    | constants.SIGN_UP_REQUEST
    | constants.SIGN_UP_SUCCESS
    | constants.SIGN_UP_FAILURE
    | constants.SIGN_OUT
  payload?: string | IUserInfos | Error
}

export function GetUserByTokenRequest(): ISignActions {
  return {
    type: constants.GET_USER_BY_TOKEN_REQUEST,
  }
}

export function GetUserByTokenSuccess(userInfos: IUserInfos): ISignActions {
  return {
    payload: userInfos,
    type: constants.GET_USER_BY_TOKEN_SUCCESS,
  }
}

export function GetUserByTokenError(err: Error): ISignActions {
  return {
    payload: err,
    type: constants.GET_USER_BY_TOKEN_FAILURE,
  }
}

export function getUserByToken(token: string): any {
  return (dispatch: Dispatch<SignActions>) => {
    dispatch(GetUserByTokenRequest())

    axios
      .get(`API_URL/auth/getUserByToken`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        const userInfos: IUserInfos = { user: res.data, token }
        dispatch(GetUserByTokenSuccess(userInfos))
      })
      .catch(err => {
        dispatch(GetUserByTokenError(err))
      })
  }
}

export function SignInRequest(): ISignActions {
  return {
    type: constants.SIGN_IN_REQUEST,
  }
}

export function SignInSuccess(userInfos: IUserInfos): ISignActions {
  return {
    payload: userInfos,
    type: constants.SIGN_IN_SUCCESS,
  }
}

export function SignInError(error: Error): ISignActions {
  return {
    payload: error,
    type: constants.SIGN_IN_FAILURE,
  }
}

export function signIn(dto: ISignInByEmail): any {
  return (dispatch: Dispatch<SignActions>) => {
    dispatch(SignInRequest())

    // Cheating auth sign-in
    dispatch(
      SignInSuccess({
        token: 'token',
        user: {
          avatar: { buffer: undefined } as any,
          email: 'user@email.com',
          id: 1,
          phoneNumber: '1',
          role: UserRoles.Regular,
        },
      })
    )

    axios
      .post(`API_URL/auth/verifyAuthUserByEmail`, dto)
      .then(res => {
        const userInfos: IUserInfos = res.data
        dispatch(SignInSuccess(userInfos))
      })
      .catch(err => {
        if (err.response && err.response.data) {
          dispatch(SignInError(err.response.data))
        }
      })
  }
}

export function SignUpRequest(): ISignActions {
  return {
    type: constants.SIGN_UP_REQUEST,
  }
}

export function SignUpSuccess(userInfos: IUserInfos): ISignActions {
  return {
    payload: userInfos,
    type: constants.SIGN_UP_SUCCESS,
  }
}

export function SignUpError(error: Error): ISignActions {
  return {
    payload: error,
    type: constants.SIGN_UP_FAILURE,
  }
}

export function signUp(dto: ISignUpByEmail): any {
  return (dispatch: Dispatch<SignActions>) => {
    dispatch(SignUpRequest())

    axios
      .post(`API_URL/auth/createUser`, dto)
      .then(res => {
        const userInfos: IUserInfos = res.data
        dispatch(SignUpSuccess(userInfos))
      })
      .catch(err => {
        if (err.response && err.response.data) {
          dispatch(SignUpError(err.response.data))
        }
      })
  }
}

export function SignOut(): ISignActions {
  return {
    type: constants.SIGN_OUT,
  }
}

export type SignActions = ISignActions
