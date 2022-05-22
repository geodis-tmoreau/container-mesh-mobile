import { Button, Checkbox, CircularProgress, Divider, Icon, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, TextField, Typography, useTheme } from "@material-ui/core";
import Page from "component/Page";
import { useEffect, useRef, useState } from "react";
import QrReader from "react-qr-reader";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import kuzzleService from "services/kuzzle/kuzzle.service";
import { TreeView } from "@material-ui/lab";
import { ChevronRight, Height, ViewArray } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import { default as MapGl } from "react-map-gl";
import Point from "component/map/Point";

const ContainerDetail = () => {
  const { reference } = useParams();
  const theme = useTheme()
  const history = useHistory()

  const [container, setContainer] = useState(null);

  useEffect(() => {
    const retrieveContainer = async () => {
      const container = await kuzzleService.getContainer(reference)
      console.log(container)
      setContainer(container);
    }
    retrieveContainer();
  }, [])


  return (
    <Page title={`Container details`}>
      <Typography variant="subtitle1">Container {reference}</Typography>
      <Divider orientation="horizontal" />
      {container &&
        <>
          <MapGl
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: container._source.lat,
              latitude: container._source.lon,
              zoom: 8
            }}
            style={{
              width: "100%",
              height: "50%",
              marginBottom: "15px",
              marginTop: "5px"
            }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Point
              key={container._id}
              id={container._id}
              coordinates={{
                latitude: container._source.lon,
                longitude: container._source.lat
              }}
              color={theme.palette.primary.main}

              selected={true}
              content={container._id}
            />
          </MapGl>
          <Typography>
            United States, Los Angeles - Los Angeles Harbor
          </Typography>
          <Button color="primary" variant="contained" onClick={() => history.push(`/containers/${reference}/identification`)} >Scan Container</Button>
        </>
      }
      {!container && <CircularProgress />}
    </Page>
  );
};

export default ContainerDetail;
