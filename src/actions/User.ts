import axios from 'axios'
import { Dispatch } from 'redux'

import * as constants from '../constants/User'
import IStoreState from '../types'
import { UserRoles } from '../types/user'

export interface IUserActions {
  type:
    | constants.GET_AVATAR_REQUEST
    | constants.GET_AVATAR_FAILURE
    | constants.GET_AVATAR_SUCCESS
    | constants.UPDATE_AVATAR_REQUEST
    | constants.UPDATE_AVATAR_FAILURE
    | constants.UPDATE_AVATAR_SUCCESS
  payload?: UserRoles | Express.Multer.File | Error
}

export function getAvatarRequest(): IUserActions {
  return {
    type: constants.GET_AVATAR_REQUEST,
  }
}

export function getAvatarFailure(err: Error): IUserActions {
  return {
    payload: err,
    type: constants.GET_AVATAR_FAILURE,
  }
}

export function getAvatarSuccess(file: Express.Multer.File): IUserActions {
  return {
    payload: file,
    type: constants.GET_AVATAR_SUCCESS,
  }
}

export function getAvatar(): any {
  return (dispatch: Dispatch<UserActions>, getState: () => IStoreState) => {
    dispatch(updateAvatarRequest())
    const state = getState()

    axios
      .get(`API_URL/file/avatar`, {
        headers: {
          Authorization: `Bearer ${state.user ? state.user.data.token : ''}`,
        },
      })
      .then(res => {
        const downloadedFile = {} as Express.Multer.File
        downloadedFile.buffer = res.data
        dispatch(updateAvatarSuccess(downloadedFile))
      })
      .catch(err => {
        dispatch(updateAvatarFailure(err))
      })
  }
}

export function updateAvatarRequest(): IUserActions {
  return {
    type: constants.UPDATE_AVATAR_REQUEST,
  }
}

export function updateAvatarFailure(err: Error): IUserActions {
  return {
    payload: err,
    type: constants.UPDATE_AVATAR_FAILURE,
  }
}

export function updateAvatarSuccess(file: Express.Multer.File): IUserActions {
  return {
    payload: file,
    type: constants.UPDATE_AVATAR_SUCCESS,
  }
}

export function updateAvatar(file: File, userId: number): any {
  return (dispatch: Dispatch<UserActions>, getState: () => IStoreState) => {
    dispatch(updateAvatarRequest())
    const state = getState()

    const data = new FormData()
    data.append('file', file)
    data.append('container', 'avatar')
    data.append('name', `user-${userId}`)

    axios
      .post(`API_URL/file/upload`, data, {
        headers: {
          Authorization: `Bearer ${state.user ? state.user.data.token : ''}`,
        },
      })
      .then(res => {
        const uploadedFile: Express.Multer.File = res.data
        dispatch(updateAvatarSuccess(uploadedFile))
      })
      .catch(err => {
        dispatch(updateAvatarFailure(err))
      })
  }
}

export type UserActions = IUserActions
