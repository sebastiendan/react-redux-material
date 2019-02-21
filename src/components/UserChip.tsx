import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import { Theme, withStyles } from '@material-ui/core/styles'
import * as React from 'react'

const styles = (theme: Theme) => ({
  chip: {
    boxShadow: theme.shadows['2'],
  },
})

function UserChip(props: any) {
  const { classes } = props

  return (
    <div>
      <Chip
        avatar={
          <Avatar src="http://www.coolmenhairstyles.com/wp-content/uploads/Best-Haircuts-for-Short-Hair-Men-42.jpg" />
        }
        className={classes.chip}
        label="User"
      />
    </div>
  )
}

export default withStyles(styles)(UserChip)
