import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import { Theme, withStyles, withTheme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Link, LinkProps } from 'react-router-dom'

const styles = (theme: Theme) => ({
  appBar: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    transition: 'background-color .4s ease',
  },
  background: {
    backgroundColor: theme.palette.grey[300],
    position: 'relative' as 'relative',
  },
  banner: {
    '& > div:first-child': {
      left: '50%',
      padding: theme.spacing.unit * 10,
      position: 'absolute' as 'absolute',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '95%',
    },
    backgroundImage:
      'url(https://images.unsplash.com/photo-1548101675-9abe7a897745?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80)',
    backgroundPosition: 'top',
    backgroundSize: 'cover',
    height: '90vh',
    position: 'relative' as 'relative',
  },
  footer: {
    backgroundColor: theme.palette.primary.main,
  },
  footerContent: {
    '& > div': {
      display: 'flex',
      flexDirection: 'column' as 'column',
      marginRight: theme.spacing.unit * 10,
    },
    '& > small': {
      bottom: theme.spacing.unit,
      color: theme.palette.common.white,
      position: 'absolute' as 'absolute',
      right: 0,
    },
    '& a': {
      '&:hover': {
        textDecoration: 'underline',
      },
      color: theme.palette.common.white,
      marginBottom: theme.spacing.unit,
      textDecoration: 'none',
    },
    display: 'flex',
    margin: 'auto',
    padding: theme.spacing.unit * 10,
    position: 'relative' as 'relative',
    width: '95%',
  },
  grow: {
    flexGrow: 1,
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
    justifyContent: 'space-around',
    marginTop: theme.spacing.unit * 2,
  },
  main: {
    backgroundColor: theme.palette.grey[200],
    borderRadius: theme.shape.borderRadius / 2,
    boxShadow: theme.shadows[24],
    margin: 'auto',
    padding: theme.spacing.unit * 10,
    position: 'relative' as 'relative',
    width: '95%',
  },
  root: {
    flexGrow: 1,
  },
  title: {
    color: theme.palette.getContrastText(theme.palette.grey[200]),
    marginBottom: theme.spacing.unit * 6,
  },
})

interface IProps {
  classes: any
  theme: Theme
}

interface IState {
  loading: boolean
}

class LandingPage extends React.Component<IProps, IState> {
  private refFooter = React.createRef<HTMLDivElement>()
  private refHeader = React.createRef<HTMLDivElement>()
  private refMain = React.createRef<HTMLDivElement>()

  constructor(props: IProps) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  public componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this))
    this.handleScroll()
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this))
  }

  public render() {
    const { classes } = this.props
    const MyLink = (to: string) => (props: LinkProps) => (
      <Link to={to} {...props} />
    )

    return (
      <div className={classes.root}>
        <Helmet>
          <title>Application Landing Page</title>
        </Helmet>
        <div ref={this.refHeader}>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Application
              </Typography>
              <Button>Home</Button>
              <Button>How it works</Button>
              <Button>Solutions</Button>
              <Button>Blogs</Button>
              <Button>Media</Button>
              <Button component={MyLink('/sign') as any}>Sign In/Up</Button>
            </Toolbar>
          </AppBar>
        </div>
        <div className={classes.banner}>
          <div>
            <Typography variant="h1">Application</Typography>
            <Typography variant="h4">This is a template</Typography>
          </div>
        </div>
        <div className={classes.background}>
          <div className={classes.main} ref={this.refMain}>
            <Typography variant="h4" className={classes.title}>
              Description
            </Typography>
          </div>
          <div className={classes.footer} ref={this.refFooter}>
            <div className={classes.footerContent}>
              <div>
                <a href="" target="_blank">
                  Corporate
                </a>
                <a href="" target="_blank">
                  Contact us
                </a>
                <a href="" target="_blank">
                  About us
                </a>
              </div>
              <div>
                <a href="" target="_blank">
                  FAQ
                </a>
                <a href="" target="_blank">
                  Privacy policy
                </a>
                <a href="" target="_blank">
                  Terms of use
                </a>
              </div>
              <small>© 2019 Sébastien Dan. All rights reserved.</small>
            </div>
          </div>
        </div>
      </div>
    )
  }

  private handleScroll() {
    const itemTranslate = -60 - window.pageYOffset / 4
    if (this.refMain && this.refMain.current) {
      this.refMain.current.style.top = `${itemTranslate}px`

      if (
        this.refHeader &&
        this.refHeader.current &&
        this.refHeader.current.firstChild
      ) {
        const header = this.refHeader.current.firstElementChild as any

        if (
          (this.refMain.current.getBoundingClientRect() as DOMRect).y -
            header.clientHeight <
          0
        ) {
          header.style.backgroundColor = this.props.theme.palette.background.default
        } else {
          header.style.backgroundColor = 'transparent'
        }
      }
    }

    if (this.refFooter && this.refFooter.current) {
      this.refFooter.current.style.marginTop = `${itemTranslate +
        this.props.theme.spacing.unit * 10}px`
    }
  }
}

export default withTheme()(withStyles(styles)(LandingPage))
