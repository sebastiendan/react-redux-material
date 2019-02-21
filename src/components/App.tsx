import * as colors from '@material-ui/core/colors'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { ConnectedRouter } from 'connected-react-router'
import * as React from 'react'

import { history } from '../config'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import PublicRoutes from '../routes/Public'
import RegularRoutes from '../routes/Regular'
import { IDataState } from '../types'
import { ITheme, IThemeOptions } from '../types/mui'
import { IUserInfos, UserRoles } from '../types/user'
import Main from './Main'

function createTheme(themeOptions: IThemeOptions): ITheme {
  const theme = createMuiTheme(themeOptions) as ITheme
  theme.palette.customs = themeOptions.palette.customs
  return theme
}

const themeRegular = createTheme({
  palette: {
    background: {
      default: '#202a30',
      paper: '#2e3941',
    },
    customs: {
      error: '#e25241',
      linearBackgroundEnd: colors.blue[800],
      linearBackgroundStart: colors.cyan[800],
      valid: colors.green.A700,
    },
    primary: colors.blue,
    secondary: colors.orange,
    type: 'dark',
  },
  typography: {
    useNextVariants: true,
  },
})

interface IProps {
  getUserByToken: (token: string) => void
  user: IDataState<IUserInfos> | undefined
}

class App extends React.Component<IProps, any> {
  private routes: any
  private theme: ITheme = themeRegular

  constructor(props: IProps) {
    super(props)
  }

  public componentWillMount() {
    if (this.props.user && this.props.user.data.token) {
      this.props.getUserByToken(this.props.user.data.token)
    }
  }

  public render() {
    switch (
      this.props.user && this.props.user.data && this.props.user.data.user
        ? this.props.user.data.user.role
        : UserRoles.Regular
    ) {
      case UserRoles.Regular:
        this.routes = RegularRoutes
        this.theme = themeRegular
        break
      default:
        this.routes = RegularRoutes
        this.theme = themeRegular
    }

    return (
      <MuiThemeProvider theme={this.theme}>
        <React.Fragment>
          <CssBaseline />
          <ConnectedRouter history={history}>
            <React.Fragment>
              {Boolean(
                this.props.user &&
                  this.props.user.data &&
                  this.props.user.data.user
              ) && (
                <div>
                  <Header />
                  <Main>{this.routes}</Main>
                  <Footer />
                </div>
              )}
              {Boolean(
                !this.props.user ||
                  (this.props.user &&
                    this.props.user.data &&
                    !this.props.user.data.token) ||
                  (this.props.user &&
                    !this.props.user.data &&
                    this.props.user.error) ||
                  (this.props.user &&
                    !this.props.user.data &&
                    this.props.user.loading)
              ) && <React.Fragment>{PublicRoutes}</React.Fragment>}
            </React.Fragment>
          </ConnectedRouter>
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
}

export default App
