import { withStyles } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Badge from '@material-ui/core/Badge'
import Chip from '@material-ui/core/Chip'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'

import MainMenu from '../containers/MainMenu'
import Messenger from '../containers/Messenger'
import UserAvatar from '../containers/UserAvatar'
import { IDataState, ILocation } from '../types'
import { ITheme } from '../types/mui'
import { IUserInfos, UserRoles } from '../types/user'

const styles = (theme: ITheme) => ({
  appBar: {
    background: `linear-gradient(to right, ${
      theme.palette.customs.linearBackgroundStart
    } 0%, ${theme.palette.customs.linearBackgroundEnd} 100%)`,
  },
  balance: {
    marginTop: theme.spacing.unit,
  },
  balanceButton: {
    margin: theme.spacing.unit,
  },
  chip: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows['2'],
  },
  chipAccount: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: theme.shadows['2'],
  },
  divider: {
    margin: `${theme.spacing.unit}px 0`,
  },
  drawer: {
    padding: theme.spacing.unit * 2,
  },
  paymentIcon: {
    marginLeft: theme.spacing.unit,
  },
  snackBar: {
    backgroundColor: theme.palette.customs.valid as string,
  },
  snackBarIcon: {
    marginRight: theme.spacing.unit,
  },
  snackBarMessage: {
    alignItems: 'center' as 'center',
    color: theme.palette.common.white,
    display: 'flex',
  },
  toolbar: {
    alignItems: 'center' as 'center',
    flexWrap: 'wrap' as 'wrap',
    justifyContent: 'flex-end',
  },
  toolbarIcon: {
    marginLeft: 5,
  },
})

interface IProps {
  getAvatar: () => void
  location: ILocation | undefined
  classes: any
  user: IDataState<IUserInfos> | undefined
}

interface IState {
  amount: number
  anchorUserEl: any
  openAccountDialog: boolean
  openAccountDrawer: boolean
  openAccountSnackBar: boolean
  pageTitle: string
}

class Header extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      amount: 10,
      anchorUserEl: null,
      openAccountDialog: false,
      openAccountDrawer: false,
      openAccountSnackBar: false,
      pageTitle: '',
    }
  }

  public componentDidMount() {
    if (this.props.user && this.props.user.data.user) {
      this.props.getAvatar()
    }
  }

  public render() {
    const { classes, user } = this.props

    return (
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div style={{ flex: 1 }}>
            <Typography variant="h6">Application</Typography>
            <Typography variant="h6">
              {this.props.location ? this.props.location.title : ''}
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Chip
              avatar={
                <UserAvatar
                  noDownload={true}
                  size="small"
                  buffer={
                    user && user.data && user.data.user && user.data.user.avatar
                      ? user.data.user.avatar.buffer
                      : undefined
                  }
                />
              }
              className={classes.chip}
              label={`${
                user && user.data && user.data.user
                  ? user.data.user.email
                  : 'Loading...'
              } | ${
                UserRoles[
                  user && user.data && user.data.user
                    ? user.data.user.role
                    : UserRoles.Regular
                ]
              }`}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginLeft: 15, color: '#fff' }}>|</div>
            <Messenger />
            <IconButton>
              <Badge badgeContent={7} color="error">
                <Icon>notifications</Icon>
              </Badge>
            </IconButton>
          </div>
          <div style={{ marginLeft: 10, color: '#fff' }}>|</div>
          <MainMenu />
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles as any)(Header)
