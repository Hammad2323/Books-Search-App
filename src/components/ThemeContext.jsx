import React, { createContext, useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const ThemeContext = createContext();

export const CustomThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: darkMode ? "#A7DCA4" : "#2E8B57", // forest/mint
          },
          secondary: {
            main: darkMode ? "#C7F9CC" : "#6BBF74",
          },
          background: {
            default: darkMode ? "#0B3D2E" : "#C7F9CC",
            paper: darkMode ? "#1E2B25" : "#E8FCEE",
          },
          text: {
            primary: darkMode ? "#E8FCEE" : "#1B4332",
          },
        },
        typography: {
          fontFamily: "Lato, Playfair Display, sans-serif",
          h6: { fontWeight: 600 },
          body2: { fontSize: "0.9rem" },
        },
        shape: { borderRadius: 16 },
      }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
