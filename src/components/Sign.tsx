import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import Fade from '@material-ui/core/Fade'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grow from '@material-ui/core/Grow'
import Icon from '@material-ui/core/Icon'
import InputAdornment from '@material-ui/core/InputAdornment'
import { Theme, withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import * as React from 'react'
import Helmet from 'react-helmet'

import { IDataState } from '../types'
import { ISignInByEmail, ISignUpByEmail, IUserInfos } from '../types/user'
import AutoComplete from './AutoComplete'
import ExtraIcon from './ExtraIcon'
import Select from './Select'

const styles = (theme: Theme) => ({
  autocomplete: {
    maxWidth: 227,
  },
  divider: {
    '&:before': {
      color: theme.palette.secondary.main,
      content: '"OR"',
      fontStyle: 'italic',
      position: 'absolute' as 'absolute',
      right: `calc(100% + ${theme.spacing.unit * 2}px)`,
      top: '50%',
      transform: 'translateY(-50%)',
    },
    backgroundColor: 'transparent',
    borderBottom: `1px dashed ${theme.palette.secondary.main}`,
    left: theme.spacing.unit * 5,
    marginBottom: `${theme.spacing.unit * 2}px !important`,
    marginTop: `${theme.spacing.unit * 4}px !important`,
    overflow: 'visible' as 'visible',
    position: 'relative' as 'relative',
    width: '70%',
  },
  error: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.text.primary,
  },
  form: {
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing.unit * 2,
    },
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column' as 'column',
    left: '50%',
    position: 'absolute' as 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  formSignIn: {
    maxWidth: 270,
  },
  formSignUp: {
    maxWidth: 227,
  },
  icon: {
    '&:before': {
      left: '50%',
      position: 'absolute' as 'absolute',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
    border: `2px solid ${theme.palette.action.active}`,
    borderRadius: '50%',
    boxSizing: 'content-box' as 'content-box',
    cursor: 'pointer' as 'pointer',
    padding: theme.spacing.unit * 2,
    position: 'relative' as 'relative',
  },
  leftIconButton: {
    marginRight: theme.spacing.unit,
  },
  link: {
    '&:hover': {
      textDecoration: 'underline',
    },
    color: theme.palette.primary.main,
    fontSize: theme.typography.pxToRem(12),
    textDecoration: 'none',
  },
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    bottom: 0,
    display: 'flex',
    left: 0,
    position: 'fixed' as 'fixed',
    right: 0,
    top: 0,
    zIndex: 1000,
  },
  signIn: {
    '& .typo': {
      opacity: 0,
      transform: 'translateY(15px)',
      transition: 'all .2s ease',
    },
    '& > *:first-child': {
      left: '50%',
      position: 'absolute' as 'absolute',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
    '& form': {
      pointerEvents: 'none' as 'none',
    },
    '&:hover': {
      '& + *': {
        zIndex: -1,
      },
      '& .typo': {
        opacity: 1,
        transform: 'translateY(10px)',
      },
      boxShadow: theme.shadows[20],
      paddingLeft: '10%',
    },
    backgroundColor: theme.palette.background.default,
    borderRadius: '0%',
    cursor: 'pointer' as 'pointer',
    height: '120%',
    position: 'relative' as 'relative',
    textAlign: 'center' as 'center',
    transition: 'all .4s ease',
    width: '100%',
  },
  signInOff: {
    '& > *:first-child': {
      display: 'none',
    },
    width: 0,
    zIndex: -1,
  },
  signInOn: {
    '& form': {
      pointerEvents: 'initial' as 'initial',
    },
    borderRadius: '0 !important',
    boxShadow: 'none !important',
    cursor: 'default !important' as 'default',
  },
  signUp: {
    '& .typo': {
      opacity: 0,
      transform: 'translateY(15px)',
      transition: 'all .2s ease',
    },
    '& > *:first-child': {
      left: '50%',
      position: 'absolute' as 'absolute',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
    '& form': {
      pointerEvents: 'none' as 'none',
    },
    '&:hover': {
      '& .typo': {
        opacity: 1,
        transform: 'translateY(10px)',
      },
      boxShadow: theme.shadows[20],
      paddingRight: '10%',
    },
    backgroundColor: theme.palette.background.paper,
    cursor: 'pointer' as 'pointer',
    height: '120%',
    position: 'relative' as 'relative',
    textAlign: 'center' as 'center',
    transition: 'all .4s ease',
    width: '100%',
  },
  signUpOff: {
    '& > *:first-child': {
      display: 'none',
    },
    width: 0,
    zIndex: -1,
  },
  signUpOn: {
    '& form': {
      pointerEvents: 'initial' as 'initial',
    },
    borderRadius: '0 !important',
    boxShadow: 'none !important',
    cursor: 'default !important' as 'default',
  },
})

const isEmail: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export interface IProps {
  classes: any
  onSubmitSignInClick: (
    e: React.FormEvent<HTMLFormElement>,
    signInUser: ISignInByEmail
  ) => void
  onSubmitSignUpClick: (
    e: React.FormEvent<HTMLFormElement>,
    signUpUser: ISignUpByEmail
  ) => void
  user: IDataState<IUserInfos> | undefined
}

export interface IState {
  countries: Array<{ label: string; value: string }>
  currency: string
  email: string
  error: Error
  firstName: string
  lastName: string
  isSignIn: boolean | undefined
  nationality: string
  password: string
  passwordConfirm: string
  submittedOnce: boolean
  username: string
}

class Sign extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      countries: [],
      currency: 'USD',
      email: 'user@email.com',
      error: {} as Error,
      firstName: '',
      isSignIn: undefined,
      lastName: '',
      nationality: '',
      password: 'dummy',
      passwordConfirm: 'dummy',
      submittedOnce: false,
      username: '',
    }
    this.onSelectChange = this.onSelectChange.bind(this)
  }

  public componentWillReceiveProps(nextProps: IProps) {
    if (
      nextProps.user &&
      nextProps.user.error &&
      nextProps.user.error.message &&
      nextProps.user.error.message !== this.state.error.message
    ) {
      this.setState({ error: nextProps.user.error })
    }
  }

  public render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Helmet>
          <title>Sign In</title>
        </Helmet>
        <div
          className={`${classes.signIn} ${
            this.state.isSignIn === false ? classes.signInOff : ''
          } ${this.state.isSignIn === true ? classes.signInOn : ''}`}
          onClick={
            this.state.isSignIn === undefined
              ? this.setSignMode(true)
              : undefined
          }
        >
          <Fade
            in={this.state.isSignIn === undefined}
            style={{
              transitionDelay: this.state.isSignIn === undefined ? '.2s' : '0s',
            }}
          >
            <div>
              <ExtraIcon size={100} className={classes.icon}>
                account-check
              </ExtraIcon>
              <Typography variant="subtitle1" className="typo">
                SIGN IN
              </Typography>
            </div>
          </Fade>
          <Fade
            in={this.state.isSignIn === true}
            style={{
              transitionDelay: this.state.isSignIn === true ? '.2s' : '0s',
            }}
          >
            <form
              id="signIn"
              noValidate={true}
              className={`${classes.form} ${classes.formSignIn}`}
              onSubmit={this.submitSignIn}
              autoComplete="off"
            >
              <Button
                type="button"
                variant="outlined"
                onClick={this.fbLogin}
                color="primary"
              >
                <ExtraIcon color="primary" className={classes.leftIconButton}>
                  facebook-box
                </ExtraIcon>
                Sign In with Facebook
              </Button>
              <Button
                type="button"
                variant="outlined"
                onClick={this.fbLogin}
                color="primary"
              >
                <ExtraIcon color="primary" className={classes.leftIconButton}>
                  google
                </ExtraIcon>
                Sign In with Google
              </Button>
              <Divider className={classes.divider} />
              <div
                className="fb-login-button"
                data-width="300"
                data-max-rows="1"
                data-size="large"
                data-button-type="continue_with"
                data-show-faces="false"
                data-auto-logout-link="false"
                data-use-continue-as="false"
              />
              <FormControl>
                <TextField
                  id="emailSignIn"
                  className={classes.darkField}
                  label="Email Address"
                  type="email"
                  required={true}
                  error={Boolean(
                    this.state.submittedOnce && this.getError('email')
                  )}
                  helperText={
                    this.state.submittedOnce ? this.getError('email') : ''
                  }
                  value={this.state.email}
                  onChange={this.onChange('email')}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon>email</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  id="passwordSignIn"
                  label="Password"
                  type="password"
                  required={true}
                  error={Boolean(
                    this.state.submittedOnce && this.getError('password')
                  )}
                  helperText={
                    this.state.submittedOnce ? this.getError('password') : ''
                  }
                  value={this.state.password}
                  onChange={this.onChange('password')}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon>vpn_key</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              {this.state.error.message && (
                <Grow in={true}>
                  <Chip
                    className={classes.error}
                    label={this.state.error.message}
                  />
                </Grow>
              )}
              <FormControlLabel
                style={{ marginBottom: 0, marginTop: -10 }}
                control={<Checkbox value="checkedA" />}
                label="Keep me signed in"
              />
              <a href="#" className={classes.link}>
                Forgot your password?
              </a>
              <div style={{ display: 'flex' }}>
                <Button
                  disabled={
                    this.state.submittedOnce &&
                    (!this.state.email ||
                      !isEmail.test(this.state.email) ||
                      !this.state.password)
                  }
                  type="submit"
                  variant="outlined"
                  color="primary"
                >
                  <ExtraIcon color="primary" className={classes.leftIconButton}>
                    email
                  </ExtraIcon>
                  Sign In with Email
                </Button>
                <Button
                  onClick={this.setSignMode(undefined)}
                  type="button"
                  color="primary"
                >
                  Back
                </Button>
              </div>
            </form>
          </Fade>
        </div>
        <div
          className={`${classes.signUp} ${
            this.state.isSignIn === false ? classes.signUpOn : ''
          } ${this.state.isSignIn === true ? classes.signUpOff : ''}`}
          onClick={
            this.state.isSignIn === undefined
              ? this.setSignMode(false)
              : undefined
          }
        >
          <Fade
            in={this.state.isSignIn === undefined}
            style={{
              transitionDelay: this.state.isSignIn === undefined ? '.2s' : '0s',
            }}
          >
            <div>
              <ExtraIcon size={100} className={classes.icon}>
                account-plus
              </ExtraIcon>
              <Typography variant="subtitle1" className="typo">
                SIGN UP
              </Typography>
            </div>
          </Fade>
          <Fade
            in={this.state.isSignIn === false}
            style={{
              transitionDelay: this.state.isSignIn === false ? '.2s' : '0s',
            }}
          >
            <form
              id="signUp"
              noValidate={true}
              className={`${classes.form} ${classes.formSignUp}`}
              onSubmit={this.submitSignUp}
              autoComplete="off"
            >
              <Typography variant="subtitle1">
                Sign Up for a Personal Account
              </Typography>
              <FormControl>
                <TextField
                  id="firstName"
                  label="First Name"
                  required={true}
                  error={Boolean(
                    this.state.submittedOnce && this.getError('firstName')
                  )}
                  helperText={
                    this.state.submittedOnce ? this.getError('firstName') : ''
                  }
                  value={this.state.firstName}
                  onChange={this.onChange('firstName')}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon>account_circle</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  id="lastName"
                  label="Last Name"
                  required={true}
                  error={Boolean(
                    this.state.submittedOnce && this.getError('lastName')
                  )}
                  helperText={
                    this.state.submittedOnce ? this.getError('lastName') : ''
                  }
                  value={this.state.lastName}
                  onChange={this.onChange('lastName')}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon>account_circle</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  id="username"
                  label="Username"
                  required={true}
                  error={Boolean(
                    this.state.submittedOnce && this.getError('username')
                  )}
                  helperText={
                    this.state.submittedOnce ? this.getError('username') : ''
                  }
                  value={this.state.username}
                  onChange={this.onChange('username')}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon>account_circle</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <AutoComplete
                className={classes.autocomplete}
                error={Boolean(
                  this.state.submittedOnce && this.getError('nationality')
                )}
                helperText={
                  this.state.submittedOnce ? this.getError('nationality') : ''
                }
                icon={<ExtraIcon>earth</ExtraIcon>}
                options={this.state.countries}
                placeholder="Search a country"
                onValueUpdate={this.onSelectChange('nationality')}
                required={true}
              />
              <Select
                icon={<Icon>attach_money</Icon>}
                label="Currency"
                onValueUpdate={this.onSelectChange('currency')}
                options={['USD', 'EUR', 'GBP', 'JPY'].map(x => ({
                  label: x,
                  value: x,
                }))}
                value="USD"
              />
              <FormControl>
                <TextField
                  id="emailSignUp"
                  label="Email Address"
                  required={true}
                  error={Boolean(
                    this.state.submittedOnce && this.getError('email')
                  )}
                  helperText={
                    this.state.submittedOnce ? this.getError('email') : ''
                  }
                  value={this.state.email}
                  onChange={this.onChange('email')}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon>email</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  id="passwordSignUp"
                  label="Password"
                  type="password"
                  required={true}
                  error={Boolean(
                    this.state.submittedOnce && this.getError('password')
                  )}
                  helperText={
                    this.state.submittedOnce ? this.getError('password') : ''
                  }
                  value={this.state.password}
                  onChange={this.onChange('password')}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon>vpn_key</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  id="passwordConfirmSignUp"
                  label="Confirm Password"
                  type="password"
                  required={true}
                  error={Boolean(
                    this.state.submittedOnce && this.getError('passwordConfirm')
                  )}
                  helperText={
                    this.state.submittedOnce
                      ? this.getError('passwordConfirm')
                      : ''
                  }
                  value={this.state.passwordConfirm}
                  onChange={this.onChange('passwordConfirm')}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon>vpn_key</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              {this.state.error.message && (
                <Grow in={true}>
                  <Chip
                    className={classes.error}
                    label={this.state.error.message}
                  />
                </Grow>
              )}
              <div style={{ display: 'flex' }}>
                <Button
                  disabled={
                    this.state.submittedOnce &&
                    (!this.state.email || !this.state.password)
                  }
                  type="submit"
                  variant="outlined"
                  color="primary"
                >
                  Sign Up
                </Button>
                <Button
                  onClick={this.setSignMode(undefined)}
                  type="button"
                  color="primary"
                >
                  Back
                </Button>
              </div>
            </form>
          </Fade>
        </div>
      </div>
    )
  }

  private onChange = (type: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    this.setState({
      [type]: e.target.value,
    } as any)
  }

  private onSelectChange = (field: string) => (value: string) => {
    this.setState({
      [field]: value,
    } as any)
  }

  private setSignMode = (isSignIn: boolean | undefined) => (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (isSignIn === false && !this.state.countries.length) {
      this.getCountries()
    }

    this.setState({ isSignIn, error: {} as Error, submittedOnce: false })
  }

  private submitSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.setState({ submittedOnce: true })

    if (!this.getError('email') && !this.getError('password')) {
      const signInUser: ISignInByEmail = {
        email: this.state.email,
        password: this.state.password,
      }
      this.props.onSubmitSignInClick(e, signInUser)
    }
  }

  private submitSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.setState({ submittedOnce: true })

    if (
      !this.getError('email') &&
      !this.getError('password') &&
      !this.getError('passwordConfirm') &&
      !this.getError('firstName') &&
      !this.getError('lastName') &&
      !this.getError('nationality')
    ) {
      const signUpUser: ISignUpByEmail = {
        currency: this.state.currency,
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        nationality: this.state.nationality,
        password: this.state.password,
        passwordConfirm: this.state.passwordConfirm,
        username: this.state.username,
      }
      this.props.onSubmitSignUpClick(e, signUpUser)
    }
  }

  private fbLogin = () => {
    FB.login((response: fb.StatusResponse) => {
      return
    }, {})
  }

  private getCountries = () => {
    axios.get('https://restcountries.eu/rest/v2/all').then(res => {
      this.setState({
        countries: res.data.map((c: any) => ({ label: c.name, value: c.name })),
      })
    })
  }

  private getError = (name: string) => {
    let error

    switch (name) {
      case 'email':
        if (!this.state.email) {
          error = 'Email is required'
        }

        if (!isEmail.test(this.state.email)) {
          error = 'Email is not valid'
        }
        break
      case 'password':
        if (!this.state.password) {
          error = 'Password is required'
        }
        break
      case 'passwordConfirm':
        if (this.state.password !== this.state.passwordConfirm) {
          error = 'Passwords do not match'
        }

        if (!this.state.passwordConfirm) {
          error = 'Password confirmation is required'
        }
        break
      case 'username':
        if (!this.state.username) {
          error = 'Username is required'
        }
        break
      case 'firstName':
        if (!this.state.firstName) {
          error = 'First name is required'
        }
        break
      case 'lastName':
        if (!this.state.lastName) {
          error = 'Last name is required'
        }
        break
      case 'nationality':
        if (!this.state.nationality) {
          error = 'Nationality is required'
        }
        break
    }

    return error
  }
}

export default withStyles(styles)(Sign)
