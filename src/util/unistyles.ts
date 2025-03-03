import {StyleSheet} from 'react-native-unistyles';
import {pallette} from './colors';

const lightTheme = {
  colors: {
    primary: pallette.primary900,
    secondary: '#1ff4ff',
    background: pallette.light900,
    textPrimary: pallette.dark900,
    textSecondary: pallette.light900,
    // any nesting, spreading, arrays, etc.
  },
  // functions, external imports, etc.
  gap: (v: number) => v * 8,
};

const otherTheme = {
  colors: {
    primary: '#aa12ff',
    secondary: 'pink',
    background: pallette.light900,
    textPrimary: pallette.dark900,
    textSecondary: pallette.light900,
  },
  gap: (v: number) => v * 8,
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
