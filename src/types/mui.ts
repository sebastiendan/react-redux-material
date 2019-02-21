import { Color, Theme } from '@material-ui/core';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { Palette, PaletteOptions } from '@material-ui/core/styles/createPalette';

export interface IPalette extends Palette {
  customs: {
    error: string | Color,
    linearBackgroundEnd: string | Color,
    linearBackgroundStart: string | Color,
    valid: string | Color,
  };
}

export interface ITheme extends Theme {
  palette: IPalette;
}

export interface IPaletteOptions extends PaletteOptions {
  customs: IPalette['customs'];
}

export interface IThemeOptions extends ThemeOptions {
  palette: IPaletteOptions;
}