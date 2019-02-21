import { withStyles } from '@material-ui/core'
import Badge from '@material-ui/core/Badge'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grow from '@material-ui/core/Grow'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import RootRef from '@material-ui/core/RootRef'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import * as moment from 'moment'
import * as React from 'react'

import { IDataState, IMultiDataState, IPagination } from '../types'
import {
  ICreateMessageDto,
  ICreateThreadDto,
  IMessage,
  IMessenger,
  IParticipant,
  IThread,
} from '../types/messenger'
import { ITheme } from '../types/mui'
import { IUser, IUserInfos } from '../types/user'
import UserAvatar from './UserAvatar'

const HEADER_HEIGHT = 40

const styles = (theme: ITheme) => ({
  avatar: {
    boxShadow: theme.shadows[2],
    height: 30,
    width: 30,
  },
  badge: {
    right: -13,
    top: 5,
  },
  close: {
    position: 'absolute' as 'absolute',
    right: theme.spacing.unit,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  content: {
    height: 320,
    overflow: 'scroll' as 'scroll',
    padding: 0,
  },
  header: {
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.main,
    boxShadow: theme.shadows[2],
    cursor: 'pointer' as 'pointer',
    display: 'flex',
    height: HEADER_HEIGHT,
    padding: theme.spacing.unit,
    position: 'relative' as 'relative',
    zIndex: 1,
  },
  message: {
    alignItems: 'flex-end',
    padding: theme.spacing.unit,
  },
  messageContent: {
    '& span': {
      fontSize: 15,
      whiteSpace: 'pre-line' as 'pre-line',
    },
    '&:after': {
      borderBottom: '4px solid transparent',
      borderRight: `5px solid ${theme.palette.secondary.main}`,
      borderTop: '4px solid transparent',
      bottom: 10,
      content: '""',
      height: 0,
      position: 'absolute' as 'absolute',
      right: '100%',
      width: 0,
    },
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.grey[200],
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    flex: 'initial',
    marginLeft: theme.spacing.unit,
    padding: `${theme.spacing.unit * 1.3}px ${theme.spacing.unit * 2}px`,
    position: 'relative' as 'relative',
    width: 220,
  },
  messageContentFromUser: {
    '&:after': {
      borderLeft: `5px solid ${theme.palette.background.default}`,
      borderRight: 'initial',
      content: '""',
      left: '100%',
      right: 'initial',
    },
    backgroundColor: theme.palette.background.default,
    marginLeft: 0,
    marginRight: theme.spacing.unit,
  },
  openThread: {
    transform: `translateY(calc(-100% + ${HEADER_HEIGHT}px))`,
  },
  recipientAvatar: {
    border: `2px solid ${theme.palette.secondary.main}`,
  },
  textField: {
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[2],
    padding: theme.spacing.unit,
  },
  thread: {
    '&:not(:last-child)': {
      marginLeft: theme.spacing.unit,
    },
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[10],
    transition: 'transform .2s ease',
    width: 300,
  },
  userAvatar: {
    backgroundColor: theme.palette.background.default,
  },
  userAvatarIcon: {
    color: `${theme.palette.action.active} !important`,
  },
})

interface IProps {
  classes: any
  closeThread: (threadId: number) => void
  createThread: (createThreadDto: ICreateThreadDto) => void
  getMessages: (threadId: number, pagination?: IPagination) => void
  messenger: IMultiDataState<IMessenger>
  sendMessage: (message: ICreateMessageDto) => void
  theme: ITheme
  thread: IThread
  unNewThreadMessages: (threadId: number) => void
  user: IDataState<IUserInfos>
}

interface IState {
  message: string
  open: boolean
}

class Thread extends React.Component<IProps, IState> {
  private closeThread: (
    id: number
  ) => (e: React.MouseEvent<HTMLDivElement>) => void
  private ref = React.createRef<HTMLDivElement>()
  private pressedKeys: number[] = []
  private scrollHeight: number = 0

  constructor(props: any) {
    super(props)
    this.state = { message: '', open: true }
    this.closeThread = (id: number) => this.props.closeThread.bind(this, id)
  }

  public componentDidMount() {
    if (!this.props.thread.messages) {
      this.props.getMessages(this.props.thread.id)
    } else {
      setTimeout(this.scrollToBottom, 0)
    }
  }

  public componentWillReceiveProps(nextProps: IProps) {
    const thread = this.props.messenger.data.threads
      ? this.props.messenger.data.threads.find(
          x => x.id === this.props.thread.id
        )
      : undefined
    const nextThread = nextProps.messenger.data.threads
      ? nextProps.messenger.data.threads.find(
          x => x.id === this.props.thread.id
        )
      : undefined

    if (
      (!thread && nextThread) ||
      (thread &&
        nextThread &&
        nextThread.messages &&
        (!thread.messages ||
          thread.messages[thread.messages.length - 1].id !==
            nextThread.messages[nextThread.messages.length - 1].id))
    ) {
      setTimeout(this.scrollToBottom, 0)
    }
  }

  public componentDidUpdate() {
    if (
      this.ref &&
      this.ref.current &&
      this.ref.current.scrollHeight - this.scrollHeight > 0
    ) {
      this.ref.current.scrollTo({
        top: this.ref.current.scrollHeight - this.scrollHeight,
      })
      this.scrollHeight = this.ref.current.scrollHeight
    }
  }

  public render() {
    const classes: any = this.props.classes
    const thread: IThread | undefined = (
      this.props.messenger.data.threads || []
    ).find(x => x.id === this.props.thread.id)
    const newMessages: IMessage[] =
      thread && thread.messages
        ? thread.messages.filter(
            x =>
              this.props.user.data.user &&
              x.new &&
              ((thread.participants as IParticipant[]).find(
                y => y.id === x.participant.id
              ) as IParticipant).userId !== this.props.user.data.user.id
          )
        : []

    if (!thread) {
      return null
    }

    return (
      <div
        className={`${classes.thread} ${
          this.state.open ? classes.openThread : ''
        }`}
        key={thread.id}
      >
        <div className={classes.header} onClick={this.onThreadClick}>
          {newMessages.length ? (
            <Badge
              badgeContent={newMessages.length}
              classes={{ badge: classes.badge }}
              color="error"
            >
              <Typography variant="subtitle1">
                {this.findRecipient(thread).username}
              </Typography>
            </Badge>
          ) : (
            <Typography variant="subtitle1">
              {this.findRecipient(thread).username}
            </Typography>
          )}
          {this.props.messenger.loadingList &&
            this.props.messenger.loadingList[thread.id] && (
              <CircularProgress
                size={20}
                style={{ marginLeft: this.props.theme.spacing.unit }}
              />
            )}
          <IconButton
            className={classes.close}
            disableRipple={true}
            onClick={this.closeThread(thread.id)}
          >
            <Icon>close</Icon>
          </IconButton>
        </div>
        <RootRef rootRef={this.ref}>
          <List className={classes.content} onScroll={this.handleScroll}>
            <div>
              {!this.props.messenger.loading &&
                thread.messages &&
                thread.messages.map((message: IMessage) => {
                  const participant = this.findParticipantInThread(
                    thread,
                    message.participant.id
                  )
                  const createdAtMoment = moment(message.createdAt)
                  return (
                    <Grow in={true} key={message.id}>
                      <ListItem
                        className={classes.message}
                        style={{
                          flexDirection:
                            this.props.user.data.user &&
                            participant.userId === this.props.user.data.user.id
                              ? 'row-reverse'
                              : 'row',
                        }}
                      >
                        <UserAvatar
                          noDownload={true}
                          size="small"
                          className={`${classes.avatar} ${
                            this.props.user.data.user &&
                            participant.userId === this.props.user.data.user.id
                              ? classes.userAvatar
                              : classes.recipientAvatar
                          }`}
                          buffer={
                            participant.userId ===
                            (this.props.user.data.user as IUser).id
                              ? (this.props.user.data.user as IUser).avatar
                                  .buffer
                              : ((thread.participants as any[]).find(
                                  x => x.id === message.participant.id
                                ) as any).avatar
                          }
                        />
                        <ListItemText
                          className={`${classes.messageContent} ${
                            this.props.user.data.user &&
                            participant.userId === this.props.user.data.user.id
                              ? classes.messageContentFromUser
                              : ''
                          }`}
                          primary={message.content}
                          secondary={createdAtMoment.fromNow()}
                        />
                      </ListItem>
                    </Grow>
                  )
                })}
            </div>
          </List>
        </RootRef>
        <TextField
          autoFocus={true}
          className={classes.textField}
          fullWidth={true}
          id="message"
          InputProps={{
            endAdornment: this.state.message ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleMessageSend}
                >
                  <Icon>send</Icon>
                </IconButton>
              </InputAdornment>
            ) : (
              ''
            ),
            inputProps: {
              onFocus: this.handleFocus,
              onKeyDown: this.handleKeyDown,
              onKeyUp: this.handleKeyUp,
            },
          }}
          margin="none"
          multiline={true}
          onChange={this.handleChange}
          placeholder="Type a message"
          rowsMax="4"
          value={this.state.message}
        />
      </div>
    )
  }

  private handleScroll = (e: React.UIEvent<HTMLUListElement>) => {
    if (this.ref && this.ref.current) {
      if (
        this.ref.current.scrollTop < 1 &&
        (!this.props.messenger.loadingList ||
          !this.props.messenger.loadingList[this.props.thread.id])
      ) {
        this.props.getMessages(this.props.thread.id, {
          skip: this.props.thread.messages.length,
          take: 10,
        })
      }
    }
  }

  private scrollToBottom = () => {
    if (this.ref && this.ref.current && this.ref.current.firstElementChild) {
      this.ref.current.scrollBy({
        top:
          this.ref.current.firstElementChild.clientHeight -
          this.ref.current.clientHeight,
      })
      this.scrollHeight = this.ref.current.scrollHeight
    }
  }

  private handleMessageSend = () => {
    if (this.props.thread.id) {
      const createMessageDto: ICreateMessageDto = {
        content: this.state.message,
        threadId: this.props.thread.id,
      }
      this.props.sendMessage(createMessageDto)
    } else {
      const createThreadDto: ICreateThreadDto = {
        firstMessageContent: this.state.message,
        participants: this.props.thread.participants as IParticipant[],
      }
      this.props.createThread(createThreadDto)
    }

    this.setState({ message: '' })
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ message: e.target.value })
  }

  private handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    this.pressedKeys.push(e.keyCode)
    if (e.keyCode === 13 && this.pressedKeys.length === 1) {
      e.preventDefault()
      this.handleMessageSend()
    }
  }

  private handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    this.pressedKeys.splice(this.pressedKeys.indexOf(e.keyCode), 1)
  }

  private handleFocus = () => {
    if (
      this.props.thread.newMessage ||
      (this.props.thread.messages &&
        this.props.thread.messages.filter(
          x =>
            x.new &&
            this.props.user.data.user !== undefined &&
            ((this.props.thread.participants as IParticipant[]).find(
              y => y.id === x.participant.id
            ) as IParticipant).userId !== this.props.user.data.user.id
        ).length)
    ) {
      this.props.unNewThreadMessages(this.props.thread.id)
    }
  }

  private onThreadClick = () => {
    this.setState({ open: !this.state.open })
  }

  private findRecipient = (thread: IThread) => {
    return (
      (thread.participants as any[]).find(x =>
        this.props.user.data.user
          ? this.props.user.data.user.id !== x.userId
          : false
      ) || (thread.participants[0] as any)
    )
  }

  private findParticipantInThread = (
    thread: IThread,
    participantId: number
  ) => {
    return (thread.participants as any[]).find(
      x => x.id === participantId
    ) as any
  }
}

export default withStyles(styles as any, { withTheme: true })(Thread)
