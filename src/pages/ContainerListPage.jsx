import { List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, Typography } from "@material-ui/core";
import Page from "component/Page";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import kuzzleService from "services/kuzzle/kuzzle.service";
import { ChevronRight, ViewArray } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";



const ContainerListPage = () => {
  const theme = useTheme()
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
      <Typography variant="h6">Containers awaiting verification</Typography>
      <List >
        {containers.map(container => {
          return (
            <ListItem key={container._id} onClick={() => history.push(`/containers/${container._id}`)} button>
              <ListItemAvatar>
                <ViewArray color="primary" />
              </ListItemAvatar>
              <ListItemText primary={`${container._source.reference}`} secondary="Container type 20p" />
              <ListItemSecondaryAction>
                <ChevronRight />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Page>
  );
};

export default ContainerListPage;
