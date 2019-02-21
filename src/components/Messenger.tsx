import { Theme, withStyles } from '@material-ui/core'
import Badge from '@material-ui/core/Badge'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import Typography from '@material-ui/core/Typography'
import * as moment from 'moment'
import * as React from 'react'

import { IDataState } from '../types'
import { IMessenger, IParticipant, IThread } from '../types/messenger'
import { IUserInfos } from '../types/user'
import UserAvatar from './UserAvatar'

const styles = (theme: Theme) => ({
  avatar: {
    border: `2px solid ${theme.palette.secondary.main}`,
  },
  menuItem: {
    alignItems: 'flex-end' as 'flex-end',
    height: 44,
    position: 'relative' as 'relative',
  },
  message: {
    '& > p, & > span': {
      maxWidth: 160,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap' as 'nowrap',
    },
  },
  new: {
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
    backgroundColor: theme.palette.primary.main,
  },
  newTag: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    color: theme.palette.action.active,
    padding: `${theme.spacing.unit / 3}px ${theme.spacing.unit / 1.5}px`,
    position: 'absolute' as 'absolute',
    right: 5,
    top: 5,
  },
})

interface IProps {
  classes: any
  getThreads: () => void
  messenger: IDataState<IMessenger>
  openThread: (id: number) => void
  user: IDataState<IUserInfos>
}

interface IState {
  anchorEl: any
}

class Messenger extends React.Component<IProps, IState> {
  private openThread: (
    id: number
  ) => (e: React.MouseEvent<HTMLDivElement>) => void

  constructor(props: any) {
    super(props)
    this.state = {
      anchorEl: undefined,
    }
    this.handleMessengerClick = this.handleMessengerClick.bind(this)
    this.openThread = (id: number) => this.props.openThread.bind(this, id)
  }

  public componentDidMount() {
    if (!this.props.messenger.data.threads) {
      this.props.getThreads()
    }
  }

  public render() {
    const { classes } = this.props
    const threadsWithNewMessages: IThread[] =
      this.props.messenger &&
      this.props.messenger.data &&
      this.props.messenger.data.threads
        ? this.props.messenger.data.threads.filter(
            x =>
              x.newMessage ||
              (x.messages &&
                x.messages.filter(
                  y =>
                    this.props.user.data.user &&
                    y.new &&
                    ((x.participants as IParticipant[]).find(
                      z => z.id === y.participant.id
                    ) as IParticipant).userId !== this.props.user.data.user.id
                ).length)
          )
        : []

    return (
      <React.Fragment>
        <IconButton
          className={classes.toolbarIcon}
          onClick={this.handleMessengerClick}
        >
          {threadsWithNewMessages.length ? (
            <Badge badgeContent={threadsWithNewMessages.length} color="error">
              <Icon>mail</Icon>
            </Badge>
          ) : (
            <Icon>mail</Icon>
          )}
        </IconButton>
        <Popper
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          transition={true}
          disablePortal={true}
        >
          {({ TransitionProps, placement }: any) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleMessengerClose}>
                  <MenuList>
                    {this.props.messenger.data.threads &&
                      this.props.messenger.data.threads.map(
                        (thread: IThread, index: number, arr: any[]) => (
                          <MenuItem
                            className={`${classes.menuItem} ${
                              thread.newMessage ? classes.new : ''
                            }`}
                            divider={index < arr.length - 1}
                            key={thread.id}
                            onClick={this.openThread(thread.id)}
                          >
                            <UserAvatar
                              className={classes.avatar}
                              noDownload={true}
                              buffer={this.findRecipient(thread).avatar}
                            />
                            <ListItemText
                              className={classes.message}
                              primary={this.findRecipient(thread).username}
                              secondary={thread.latestMessage.content}
                            />
                            <Typography variant="body2">
                              {moment(thread.latestMessage.createdAt).fromNow()}
                            </Typography>
                            {thread.newMessage && (
                              <Typography
                                className={classes.newTag}
                                variant="body2"
                              >
                                New
                              </Typography>
                            )}
                          </MenuItem>
                        )
                      )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </React.Fragment>
    )
  }

  private handleMessengerClick = (e: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: e.currentTarget })
  }

  private handleMessengerClose = () => {
    this.setState({ anchorEl: null })
  }

  private findRecipient = (thread: IThread) => {
    return (thread.participants.find(x =>
      this.props.user.data.user
        ? this.props.user.data.user.id !== x.userId
        : false
    ) || thread.participants[0]) as any
  }
}

export default withStyles(styles)(Messenger)
