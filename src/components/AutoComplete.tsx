import Chip from '@material-ui/core/Chip'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { emphasize } from '@material-ui/core/styles/colorManipulator'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import CancelIcon from '@material-ui/icons/Cancel'
import * as React from 'react'
import Select from 'react-select'

import { ITheme } from '../types/mui'

const styles = (theme: ITheme) => ({
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    ),
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  input: {
    '& p': {
      '& + div': {
        position: 'absolute' as 'absolute',
      },
      overflow: 'hidden' as 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap' as 'nowrap',
      width: '100%',
    },
    '& span': {
      display: 'none',
    },
    cursor: 'pointer' as '@pointer',
    display: 'flex',
    maxWidth: 168,
    padding: theme.spacing.unit * 1.5,
    paddingLeft: 0,
    textAlign: 'left' as 'left',
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  paper: {
    left: 0,
    marginTop: theme.spacing.unit,
    position: 'absolute' as 'absolute',
    right: 0,
    zIndex: 10,
  },
  placeholder: {},
  root: {
    flexGrow: 1,
    width: '100%',
  },
  singleValue: {
    fontSize: 16,
  },
  valueContainer: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap' as 'wrap',
    overflow: 'hidden',
  },
})

function NoOptionsMessage(props: any) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function inputComponent({ inputRef, ...props }: any) {
  return <div ref={inputRef} {...props} />
}

function Control(props: any) {
  return (
    <TextField
      fullWidth={true}
      InputProps={{
        inputComponent,
        inputProps: {
          children: props.children,
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          ...props.innerProps,
        },
        startAdornment: props.selectProps.InputProps.startAdornment,
      }}
      {...props.selectProps.textFieldProps}
    />
  )
}

function Option(props: any) {
  const { onMouseMove, onMouseOver, ...newInnerProps } = props.innerProps
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...newInnerProps}
    >
      {props.children}
    </MenuItem>
  )
}

function Placeholder(props: any) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function SingleValue(props: any) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function ValueContainer(props: any) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  )
}

function MultiValue(props: any) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={`${props.selectProps.classes.chip} ${
        props.isFocused ? [props.selectProps.classes.chipFocused] : ''
      }`}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  )
}

function Menu(props: any) {
  return (
    <Paper
      square={true}
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  )
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
}

interface IProps {
  classes: any
  className: any
  error?: boolean
  helperText?: string
  icon?: React.ReactElement<any>
  onValueUpdate: (value: any) => void
  options: Array<{ label: string; value: string | number }>
  placeholder: string
  required?: boolean
  theme: ITheme
}

interface IState {
  value: any
}

class AutoComplete extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      value: null,
    }
  }

  public render() {
    const { classes } = this.props

    const selectStyles = {
      input: (base: any) => ({
        ...base,
        '& input': {
          font: 'inherit',
        },
        color: this.props.theme.palette.text.primary,
      }),
    }

    const MySelect = Select as any

    return (
      <div className={`${classes.root} ${this.props.className}`}>
        <MySelect
          classes={classes}
          styles={selectStyles}
          options={this.props.options}
          components={components}
          value={this.state.value}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          InputProps={{
            startAdornment: this.props.icon ? (
              <InputAdornment position="start">
                {this.props.icon}
              </InputAdornment>
            ) : null,
          }}
          textFieldProps={{
            InputLabelProps: {
              shrink: true,
            },
            error: this.props.error,
            helperText: this.props.helperText,
            label: 'Nationality',
            required: this.props.required,
            variant: 'outlined',
          }}
        />
      </div>
    )
  }

  private handleChange = (option: { label: string; value: any }) => {
    this.props.onValueUpdate(option.value)
    this.setState({ value: option })
  }
}

export default withStyles(styles as any, { withTheme: true })(
  AutoComplete as any
)
