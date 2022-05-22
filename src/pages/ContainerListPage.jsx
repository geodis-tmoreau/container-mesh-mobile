import { List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles } from "@material-ui/core";
import Page from "component/Page";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import kuzzleService from "services/kuzzle/kuzzle.service";
import { ChevronRight, ViewArray } from "@material-ui/icons";

const useStyles = makeStyles({
  scannerContainer: {
    display: "flex",
    justifyContent: "center",
  },
  infoContainer: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    "& > *": {
      margin: "0.5rem 0",
    },
  },
  container: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

const ContainerListPage = () => {
  const classes = useStyles();

  const history = useHistory()
  const [containers, setContainers] = useState([]);

  useEffect(() => {
    const retrieveContainers = async () => {
      const containers = await kuzzleService.getContainers()
      setContainers(containers.hits);
    }
    retrieveContainers();
  }, [])

  return (
    <Page title="Containers">
      <div className={classes.container}>
        <div className={classes.infoContainer}>
          <List className={classes.root}>
            {containers.map(container => {
              return (
                <ListItem key={container._id} onClick={() => history.push(`/containers/${container._id}`)} button>
                  <ListItemAvatar>
                    <ViewArray />
                  </ListItemAvatar>
                  <ListItemText primary={`${container._source.reference}`} secondary="Container type 20p" />
                  <ListItemSecondaryAction>
                    <ChevronRight />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>
    </Page>
  );
};

export default ContainerListPage;
