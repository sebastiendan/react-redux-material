import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Theme, withStyles } from '@material-ui/core/styles'
import * as React from 'react'
import { Link } from 'react-router-dom'

const styles = (theme: Theme) => ({
  drawerHeader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative' as 'relative',
    width: 240,
  },
})

export interface IProps {
  onSignOutClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export interface IState {
  open: boolean
}

class MainMenu extends React.Component<any, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      open: false,
    }
  }

  public render() {
    const MyLink = (to: string) => (props: any) => <Link to={to} {...props} />
    return (
      <div>
        <IconButton onClick={this.toggleMenu.bind(this, true)}>
          <Icon>menu</Icon>
        </IconButton>
        <Drawer
          anchor="right"
          open={this.state.open}
          onClose={this.toggleMenu.bind(this, false)}
        >
          <div
            tabIndex={0}
            role="button"
            onKeyDown={this.toggleMenu.bind(this, false)}
          >
            <List onClick={this.toggleMenu.bind(this, false)}>
              <ListItem component={MyLink('/projects')} button={true}>
                <ListItemIcon>
                  <Icon>inbox</Icon>
                </ListItemIcon>
                <ListItemText primary="Page 1" />
              </ListItem>
              <ListItem disabled={true} button={true}>
                <ListItemIcon>
                  <Icon>dashboard</Icon>
                </ListItemIcon>
                <ListItemText primary="Page 2" />
              </ListItem>
              <ListItem disabled={true} button={true}>
                <ListItemIcon>
                  <Icon>list</Icon>
                </ListItemIcon>
                <ListItemText primary="Page 3" />
              </ListItem>
              <ListItem disabled={true} button={true}>
                <ListItemIcon>
                  <Icon>youtube_searched_for</Icon>
                </ListItemIcon>
                <ListItemText primary="Page 4" />
              </ListItem>
              <ListItem disabled={true} button={true}>
                <ListItemIcon>
                  <Icon>search</Icon>
                </ListItemIcon>
                <ListItemText primary="Page 5" />
              </ListItem>
              <ListItem disabled={true} button={true}>
                <ListItemIcon>
                  <Icon>chat</Icon>
                </ListItemIcon>
                <ListItemText primary="Page 6" />
              </ListItem>
              <ListItem disabled={true} button={true}>
                <ListItemIcon>
                  <Icon>format_list_numbered</Icon>
                </ListItemIcon>
                <ListItemText primary="Page 7" />
              </ListItem>
              <ListItem disabled={true} button={true}>
                <ListItemIcon>
                  <Icon>loyalty</Icon>
                </ListItemIcon>
                <ListItemText primary="Page 8" />
              </ListItem>
            </List>
            <Divider />
            <List onClick={this.toggleMenu.bind(this, false)}>
              <ListItem component={MyLink('/profile')} button={true}>
                <ListItemIcon>
                  <Icon>perm_identity</Icon>
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem onClick={this.props.onSignOutClick} button={true}>
                <ListItemIcon>
                  <Icon>exit_to_app</Icon>
                </ListItemIcon>
                <ListItemText primary="Sign out" />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </div>
    )
  }

  private toggleMenu(open: boolean): any {
    this.setState({ open })
  }
}

export default withStyles(styles)(MainMenu)
