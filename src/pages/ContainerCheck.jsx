import { Button, Checkbox, CircularProgress, Divider, Icon, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles, TextField, Typography, useTheme } from "@material-ui/core";
import Page from "component/Page";
import QrReader from "react-qr-reader";
import { useParams } from "react-router-dom";

const ContainerCheck = () => {
  const { reference } = useParams();

  const checks = [
    "Undercarriage",
    "Doors",
    "Left side",
    "Front wall",
    "Right side",
    "Floor",
    "Roof",
  ]


  return (
    <Page title="Container check">
      <Typography variant="subtitle1">Please check container {reference}</Typography>
      <Divider orientation="horizontal" />

      <List>
        {checks.map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem key={value} role={undefined} dense button>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItem>
          );
        })}
      </List>

      <Button color="primary" variant="contained">Submit</Button>

    </Page >
  );
};

export default ContainerCheck;
