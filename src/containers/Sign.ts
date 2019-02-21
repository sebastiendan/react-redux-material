import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import * as actions from '../actions/Sign'
import Sign from '../components/Sign'
import IStoreState from '../types'
import { ISignInByEmail, ISignUpByEmail } from '../types/user'

export function mapStateToProps({ user }: IStoreState) {
  return {
    user,
  }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.SignActions>) {
  return {
    onSubmitSignInClick: (
      e: React.FormEvent<HTMLFormElement>,
      signInUser: ISignInByEmail
    ) => {
      dispatch(actions.signIn(signInUser))
    },
    onSubmitSignUpClick: (
      e: React.FormEvent<HTMLFormElement>,
      signUpUser: ISignUpByEmail
    ) => {
      dispatch(actions.signUp(signUpUser))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sign)
