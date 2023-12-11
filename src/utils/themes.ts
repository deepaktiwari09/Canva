import {
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
  configureFonts,
} from "react-native-paper";
import { Poppins_Black } from "../assets/fonts/Poppins";

//To create themes visit https://m3.material.io/theme-builder#/custom

export const DarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#8dcdff",
    onPrimary: "#00344f",
    primaryContainer: "#004b70",
    onPrimaryContainer: "#cae6ff",
    secondary: "#7bda9c",
    onSecondary: "#00391d",
    secondaryContainer: "#00522c",
    onSecondaryContainer: "##97f7b7",
    tertiary: "#ffb4a4",
    onTertiary: "#630e00",
    tertiaryContainer: "#87210c",
    onTertiaryContainer: "#ffdad3",
    error: "#ffb4ab",
    onError: "#690005",
    errorContainer: "#93000a",
    onErrorContainer: "#ffdad6",
    background: "#1a1c1e",
    onBackground: "#e2e2e5",
    surface: "#1a1c1e",
    onSurface: "#e2e2e5",
  },
} as MD3Theme;

export const LightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#006493",
    onPrimary: "#ffffff",
    primaryContainer: "#cae6ff",
    onPrimaryContainer: "#001e30",
    secondary: "#006d3d",
    onSecondary: "#ffffff",
    secondaryContainer: "#97f7b7",
    onSecondaryContainer: "#00210f",
    tertiary: "#a73921",
    onTertiary: "#ffffff",
    tertiaryContainer: "#ffdad3",
    onTertiaryContainer: "#3d0500",
    error: "#ba1a1a",
    onError: "#ffffff",
    errorContainer: "#ffdad6",
    onErrorContainer: "#410002",
    background: "#fcfcff",
    onBackground: "#1a1c1e",
    surface: "#fcfcff",
    onSurface: "#1a1c1e",
  },
} as MD3Theme;
