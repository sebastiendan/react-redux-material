import { Theme, withStyles, withTheme } from '@material-ui/core';
import * as React from 'react';

const styles = (theme: Theme) => ({
  extraIcon: {
    '&:before': {
      left: '50%',
      position: 'absolute' as 'absolute',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
    position: 'relative' as 'relative',
  },
});

export interface IProps {
  children: any;
  classes?: any;
  className?: any;
  color?: 'action' | 'contrast' | 'light' | 'primary' | 'secondary';
  size?: number;
  theme: Theme;
}

function ExtraIcon(props: IProps) {
  const theme: Theme = props.theme;
  let color: string;

  switch(props.color) {
    case 'action':
      color = theme.palette.action.active;
      break;
    case 'contrast':
      color = theme.palette.common.black;
      break;
    case 'primary':
      color = theme.palette.primary.main;
      break;
    case 'secondary':
      color = theme.palette.secondary.main;
      break;
    default:
      color = '#fff';
  }

  return (
    <span
      className={`material-icons mdi mdi-${props.children} ${props.className} ${props.classes.extraIcon}`}
      style={{
        color,
        fontSize: props.size || 24,
        height: props.size || 24,
        width: props.size || 24,
      }}
    />
  )
}

export default withTheme()(withStyles(styles)(ExtraIcon));
