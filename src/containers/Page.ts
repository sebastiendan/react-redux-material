import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import * as locationActions from '../actions/Location'
import Page from '../components/Page'

export function mapDispatchToProps(
  dispatch: Dispatch<locationActions.LocationActions>
) {
  return {
    setTitle: (title: string) => dispatch(locationActions.setTitle(title)),
  }
}

export default connect(
  undefined,
  mapDispatchToProps
)(Page)
