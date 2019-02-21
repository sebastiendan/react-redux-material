import FormControl from '@material-ui/core/FormControl'
import Icon from '@material-ui/core/Icon'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import MuiSelect from '@material-ui/core/Select'
import { withStyles } from '@material-ui/core/styles'
import * as React from 'react'

import { ITheme } from '../types/mui'

const styles = (theme: ITheme) => ({
  formControl: {
    minWidth: 227,
  },
  input: {
    paddingLeft: theme.spacing.unit,
  },
  select: {
    '& svg': {
      display: 'none',
    },
    '&:after': {
      borderBottom: `2px solid ${theme.palette.text.primary}`,
      borderRight: `2px solid ${theme.palette.text.primary}`,
      content: '""',
      height: theme.spacing.unit,
      position: 'absolute' as 'absolute',
      right: theme.spacing.unit * 3,
      top: '50%',
      transform: 'translateY(-50%) rotate(45deg)',
      width: theme.spacing.unit,
    },
    textAlign: 'left' as 'left',
  },
})

interface IProps {
  classes: any
  label: string
  icon?: React.ReactElement<any>
  onValueUpdate: (value: any) => void
  options: Array<{ label: string; value: string | number }>
  required?: boolean
  theme: ITheme
  value: any
}

interface IState {
  value: any
}

class Select extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      value: this.props.value || '',
    }
  }

  public render() {
    const { classes } = this.props

    return (
      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel htmlFor={`select-${this.props.label}`}>
          {this.props.label}
        </InputLabel>
        <MuiSelect
          className={classes.select}
          input={
            <OutlinedInput
              id={`select-${this.props.label}`}
              inputProps={{
                className: classes.input,
              }}
              labelWidth={70}
              name={`select-${this.props.label}`}
              required={this.props.required}
              startAdornment={
                this.props.icon ? <Icon>{this.props.icon}</Icon> : null
              }
            />
          }
          value={this.state.value}
          onChange={this.handleChange}
        >
          {this.props.options.map((x: any, index: number) => (
            <MenuItem key={index} value={x.value}>
              {x.label}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    )
  }

  private handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.onValueUpdate(e.target.value)
    this.setState({ value: e.target.value })
  }
}

export default withStyles(styles as any, { withTheme: true })(Select as any)
