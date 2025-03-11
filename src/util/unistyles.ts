import {StyleSheet} from 'react-native-unistyles';
import {pallette} from './colors';

const lightTheme = {
  colors: {
    primary: pallette.primary900,
    secondary: '#1ff4ff',
    background: pallette.light900,
    backgroundSecondary: pallette.light950,
    textPrimary: pallette.dark900,
    textSecondary: pallette.light900,
    textLight: pallette.dark700,
    textHighlight: pallette.primary900,
    danger: pallette.danger900,
    success: pallette.success900,
    // any nesting, spreading, arrays, etc.
  },
  // functions, external imports, etc.
  spacing: {
    xs: 4,
    s: 8,
    sm: 12,
    m: 16,
    l: 32,
    xl: 64,
  },
};

const otherTheme = {
  colors: {
    primary: pallette.primary900,
    secondary: '#1ff4ff',
    background: pallette.light900,
    backgroundSecondary: pallette.light950,
    textPrimary: pallette.dark900,
    textSecondary: pallette.light900,
    textLight: pallette.dark700,
    textHighlight: pallette.primary900,
    danger: pallette.danger900,
    success: pallette.success900,
  },
  spacing: {
    xs: 4,
    s: 8,
    sm: 12,
    m: 16,
    l: 32,
    xl: 64,
  },
};

const breakpoints = {
  xs: 0, // <-- make sure to register one breakpoint with value 0
  sm: 300,
  md: 500,
  lg: 800,
  xl: 1200,
  // use as many breakpoints as you need
};

const appThemes = {
  light: lightTheme,
  other: otherTheme,
};

type AppThemes = typeof appThemes;
type AppBreakpoints = typeof breakpoints;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  settings: {
    initialTheme: 'light',
  },
  themes: appThemes,
  breakpoints,
});
