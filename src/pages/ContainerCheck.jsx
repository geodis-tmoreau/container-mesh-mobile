import { Button, ButtonGroup, Divider, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { AddAPhoto } from "@material-ui/icons";
import Page from "component/Page";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";



const PassFail = () => {
  const [choice, setChoice] = useState("none")

  return <>
    <ButtonGroup style={{ marginRight: "10px" }}>
      <Button color={choice === "pass" ? "primary" : "default"} variant="contained" onClick={() => setChoice("pass")}>Pass</Button>
      <Button color={choice === "fail" ? "secondary" : "default"} variant="contained" onClick={() => setChoice("fail")}>Fail</Button>
    </ButtonGroup>
    {choice === "fail" &&
      <Button color="secondary" variant="outlined" startIcon={<AddAPhoto />} >Take a picture</Button>
    }
  </>
}

const ContainerCheck = () => {
  const { reference } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory()

  const checks = [
    "Undercarriage",
    "Doors",
    "Left side",
    "Front wall",
    "Right side",
    "Floor",
    "Roof",
  ]


  const onSubmit = () => {
    enqueueSnackbar(`Check report for container ${reference} successfully sent!`, {
      variant: "success"
    })
    history.push("/")
  }


  return (
    <Page title="Container check">
      <Typography variant="subtitle1">Please check container {reference}</Typography>
      <Divider orientation="horizontal" />

      <List >
        {checks.map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem key={value} button>
              <ListItemText id={labelId} primary={`${value}`} secondary={<PassFail />} />
            </ListItem>
          );
        })}
      </List>

      <Button color="primary" variant="contained" onClick={onSubmit}>Submit</Button>

    </Page >
  );
};

export default ContainerCheck;
