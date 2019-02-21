import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import * as signActions from '../actions/Sign'
import MainMenu from '../components/MainMenu'

export function mapDispatchToProps(
  dispatch: Dispatch<signActions.SignActions>
) {
  return {
    onSignOutClick: (e: React.MouseEvent<HTMLButtonElement>) =>
      dispatch(signActions.SignOut()),
  }
}

export default connect(
  undefined,
  mapDispatchToProps
)(MainMenu)
