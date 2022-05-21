import React, { useEffect } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import ExamplePage from "pages/ExamplePage";

const RouterContainer = () => {
  const location = useLocation();

  return (
    <Switch>
      {location.pathname !== "/example" &&
        <Redirect to="/example" />}

      <Route path="/example">
        <ExamplePage />
      </Route>

    </Switch>
  );
};

const App = () => {
  useEffect(() => {
    const handleResize = () => {
      document.getElementById("root").style.height = `${window.innerHeight}px`;
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  });

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <RouterContainer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
