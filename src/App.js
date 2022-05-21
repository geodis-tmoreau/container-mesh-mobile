import React, { useEffect, useMemo } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
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

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: "dark",
          primary: {
            main: "#145c55"
          },
          secondary: {
            main: "#f15e22"
          },
          background: {
            default: "#1b212c"
          }
        },
        typography: {
          h6: {
            color: "#d9ead3"
          }
        },
        overrides: {
          MuiAppBar: {
            root: {
              borderBottom: "1px solid #d9ead3"
            }
          },
          MuiTab: {
            textColorInherit: {
              '&$selected': {
                color: "#d9ead3",
              }
            }
          }
        }
      }),
    []
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
