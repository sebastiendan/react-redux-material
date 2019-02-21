import { RouterState } from 'connected-react-router'

import { IMessenger } from './messenger'
import { IUserInfos } from './user'

export default interface IStoreState {
  location: ILocation | undefined
  messenger: IMultiDataState<IMessenger>
  router: RouterState | undefined
  user: IDataState<IUserInfos> | undefined
}

export interface IDataState<T> {
  data: T
  done: boolean
  error: Error | undefined
  loading: boolean
}

export interface IMultiDataState<T> extends IDataState<T> {
  errorList: { [id: number]: Error | undefined } | undefined
  loadingList: { [id: number]: boolean } | undefined
}

export interface IDataPatchDto<T> {
  id: number
  property: string
  value: T
}

export interface IPagination {
  skip: number
  take: number
}

export interface ILocation {
  title: string
}
