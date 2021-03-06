import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#007FFF",
    },
    secondary: {
      main: "#326eb3",
    },
    warning: {
      main: "#FF9800",
    },
    danger: {
      main: "#fb7c7c",
    },
  },
  //custom theme variables
  //   bg: {
  //     main: "#fff",
  //     light: "#F4F5F7",
  //   },
  //   text: {
  //     main: "#172B4D",
  //     light: "#262930",
  //   },
});

export default theme;
