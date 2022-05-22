import { Button, CircularProgress, Divider, TextField, Typography, useTheme } from "@material-ui/core";
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
  const [scanned, setScanned] = useState(false);
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
      const width = "100%"
      setPreviewStyle({
        width,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScan = (result) => {
    if (result) {
      setScanned(true);
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
          <TextField
            value={result}
            onChange={() => { }}
            variant="outlined"
            error={!!error}
            helperText={error}
            style={{
              marginTop: "15px",
              marginBottom: "15px"
            }}
          ></TextField>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push(`/containers/${reference}/check`)}
          >
            Continue {!scanned && "without scanning"}
          </Button>

        </>
      }
      {!container && <CircularProgress />}
    </Page >
  );
};

export default ContainerIdentification;
