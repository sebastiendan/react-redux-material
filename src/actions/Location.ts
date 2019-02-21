import * as constants from '../constants/Location';

export interface ILocationActions {
  type: constants.SET_TITLE;
  payload: string;
}

export function setTitle(title: string): ILocationActions {
  return {
    payload: title,
    type: constants.SET_TITLE,
  };
}

export type LocationActions = ILocationActions;