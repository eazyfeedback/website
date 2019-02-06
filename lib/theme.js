import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: {
    tertiary: {
      light: "#ffff00",
      main: "#ffff33",
      dark: "#b2b200",
      contrastText: "#000"
    }
  }
});
export default theme;
