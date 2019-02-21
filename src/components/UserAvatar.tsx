import { Theme, withStyles } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Icon from '@material-ui/core/Icon'
import axios from 'axios'
import * as React from 'react'

import { IDataState } from '../types'
import { IUserInfos } from '../types/user'
import { arrayBufferToBase64 } from '../utils'

const styles = (theme: Theme) => ({
  avatar: {
    backgroundColor: theme.palette.common.white,
    border: `2px solid ${theme.palette.background.paper}`,
    boxShadow: theme.shadows[5],
  },
  avatarIcon: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.grey[200],
  },
  small: {
    height: 32,
    width: 32,
  },
})

export interface IProps {
  buffer?: Buffer
  classes?: any
  className?: string
  noDownload?: boolean
  size?: 'default' | 'small' | 'big'
  user?: IDataState<IUserInfos>
  userId?: number
}

export interface IState {
  buffer: Buffer | undefined
  size: 'default' | 'small' | 'big'
}

class UserAvatar extends React.PureComponent<IProps, IState> {
  private source: any

  constructor(props: IProps) {
    super(props)
    this.state = {
      buffer: this.props.noDownload ? this.props.buffer : undefined,
      size: this.props.size || 'default',
    }
    this.source = axios.CancelToken.source()
  }

  public componentDidMount() {
    if (!this.props.noDownload) {
      const data = {
        container: 'avatar',
        name: `user-${this.props.userId}`,
      }

      axios
        .post(`API_URL/file/download`, data, {
          cancelToken: this.source.token,
          headers: {
            Authorization: `Bearer ${
              this.props.user ? this.props.user.data.token : ''
            }`,
          },
        })
        .then(res => {
          this.setState({ buffer: res.data })
        })
        .catch(error => error)
    }
  }

  public componentWillUnmount() {
    this.source.cancel()
  }

  public componentWillReceiveProps(nextProps: IProps) {
    if (this.props.noDownload && this.state.buffer !== nextProps.buffer) {
      this.setState({ buffer: nextProps.buffer })
    }
  }

  public render() {
    const { classes } = this.props

    return this.state.buffer ? (
      <Avatar
        className={`${this.props.className} ${classes.avatar} ${
          this.state.size === 'default' ? '' : classes[this.state.size]
        }`}
        src={`data:image/png;base64,${arrayBufferToBase64(this.state.buffer)}`}
      />
    ) : (
      <Avatar
        className={`${this.props.className} ${classes.avatar} ${
          classes.avatarIcon
        } ${this.state.size === 'default' ? '' : classes[this.state.size]}`}
      >
        <Icon>face</Icon>
      </Avatar>
    )
  }
}

export default withStyles(styles)(UserAvatar)
