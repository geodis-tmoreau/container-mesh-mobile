import { Button, Checkbox, CircularProgress, Divider, Icon, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, TextField, Typography, useTheme } from "@material-ui/core";
import Page from "component/Page";
import { useEffect, useRef, useState } from "react";
import QrReader from "react-qr-reader";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import kuzzleService from "services/kuzzle/kuzzle.service";
import { useParams } from "react-router-dom";

const ContainerIdentification = () => {
  const { reference } = useParams();
  const theme = useTheme()

  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const scannerRef = useRef(null);

  const [container, setContainer] = useState(null);

  const [result, setResult] = useState(
    `https://api.onerecord.fr/containers/${reference}`
  );
  const [legacyMode, setLegacyMode] = useState(false);
  const [error, setError] = useState(null);

  const [previewStyle, setPreviewStyle] = useState({
    width: 0,
    height: 0,
  });

  const delay = 100;

  useEffect(() => {
    const retrieveContainer = async () => {
      const container = await kuzzleService.getContainer(reference)
      setContainer(container);
    }
    retrieveContainer();
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const pageContainer = document.getElementById("page-container");
      const width = pageContainer.offsetWidth * 0.6;
      setPreviewStyle({
        width,
        height: width,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScan = (result) => {
    if (result) {
      setResult(result);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setLegacyMode(true);
  };


  return (
    <Page title="Container check">
      <Typography variant="subtitle1">Please identify container {reference}</Typography>
      <Divider orientation="horizontal" />
      {container &&
        <>
          <QrReader
            ref={scannerRef}
            delay={delay}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
            legacyMode={legacyMode}
          />
          <Button variant="outlined" onClick={() => { }}>
            Upload QR Code
          </Button>
          <TextField
            value={result}
            onChange={() => { }}
            variant="outlined"
            error={!!error}
            helperText={error}
          ></TextField>

          <Typography>Load demo data:</Typography>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push(`/containers/${reference}/check`)}
            >
              Container
            </Button>
          </div>

        </>
      }
      {!container && <CircularProgress />}
    </Page >
  );
};

export default ContainerIdentification;
