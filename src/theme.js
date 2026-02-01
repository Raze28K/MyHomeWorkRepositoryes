import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffcc00",
      light: "#ffd633",
      dark: "#e6b800",
    },
    background: {
      default: "#0f0f10",
      paper: "#1f1f23",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: "2.2rem", fontWeight: 600 },
    h2: { fontSize: "1.6rem", fontWeight: 600 },
    h3: { fontSize: "1.25rem", fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
  transitions: {
    duration: { short: 200, standard: 250 },
  },
});
