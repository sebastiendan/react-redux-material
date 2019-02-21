import { Theme, withStyles } from '@material-ui/core'
import * as React from 'react'

const styles = (theme: Theme) => ({
  loader: {
    '&:after': {
      animation: 'bounceUp .5s both ease infinite',
      backgroundColor: theme.palette.secondary.main,
      border: `2px solid #d07038`,
      borderRadius: '50%',
      boxShadow: theme.shadows[20],
      content: '""',
      height: '45%',
      position: 'absolute' as 'absolute',
      right: 0,
      width: '45%',
    },
    '&:before': {
      animation: 'bounceDown .5s both ease infinite',
      backgroundColor: theme.palette.background.paper,
      border: `2px solid #525252`,
      borderRadius: '50%',
      boxShadow: theme.shadows[20],
      content: '""',
      height: '45%',
      left: 0,
      position: 'absolute' as 'absolute',
      width: '45%',
    },
    height: 80,
    margin: 'auto',
    position: 'relative' as 'relative',
    width: 80,
  },
})

interface IProps {
  classes: any
  loading: boolean
}

interface IState {
  visible: boolean
}

class Loader extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { visible: props.loading }
  }

  public componentWillReceiveProps(props: IProps) {
    if (this.state.visible && !props.loading) {
      setTimeout(() => {
        this.setState({ visible: props.loading })
      }, 600)
    } else {
      this.setState({ visible: props.loading })
    }
  }

  public render() {
    const classes: any = this.props.classes

    return (
      <React.Fragment>
        {this.state.visible && <div className={classes.loader} />}
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Loader)
