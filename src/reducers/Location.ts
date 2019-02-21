import { LocationActions } from '../actions/Location';
import { ILocation } from '../types';

const LocationReducer = (location: ILocation | undefined, action: LocationActions) => {
  switch (action.type) {
    case 'SET_TITLE':
      return {
        ...location,
        title: action.payload,
      };
    default:
      return location;
  }
}

export default LocationReducer;
