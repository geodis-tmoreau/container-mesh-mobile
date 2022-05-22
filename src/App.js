import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from "notistack";
import kuzzleService from "services/kuzzle/kuzzle.service";
import kuzzle from "services/kuzzle";
import ContainerListPage from "pages/ContainerListPage";
import ContainerDetail from "pages/ContainerDetail";
import Page from "component/Page";
import { CircularProgress } from "@material-ui/core";
import ContainerIdentification from "pages/ContainerIdentification";
import ContainerCheck from "pages/ContainerCheck";

const RouterContainer = () => {

  return (
    <Switch>
      <Route path="/containers/:reference/identification">
        <ContainerIdentification />
      </Route>
      <Route path="/containers/:reference/check">
        <ContainerCheck />
      </Route>
      <Route path="/containers/:reference">
        <ContainerDetail />
      </Route>
      <Route path="/">
        <ContainerListPage />
      </Route>
    </Switch>
  );
};

const App = () => {

  const [kuzzleReady, setKuzzleReady] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      document.getElementById("root").style.height = `${window.innerHeight}px`;
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    async function init() {
      await kuzzleService.init("usecase-2")
      setKuzzleReady(true)
    }
    init();
    return () => kuzzle.disconnect()
  }, [])

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
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          {kuzzleReady &&
            <RouterContainer />
          }
          {!kuzzleReady && <Page title="Loading"><CircularProgress /></Page>}
        </Router>
      </ThemeProvider>
    </SnackbarProvider>
  );
};

export default App;
