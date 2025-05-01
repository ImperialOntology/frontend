import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          backgroundColor: "#E7F0DC", 
          minHeight: "100vh",
          fontFamily: "Roboto",
        },
        body: {
          backgroundColor: "#E7F0DC", 
          margin: 0,
          padding: 0,
          minHeight: "100vh",
          fontFamily: "Roboto",
        },
        "#root": {
          minHeight: "100vh",
        },
      },
    },
  },
});

export default theme;
