import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

import Typography from "@material-ui/core/Typography";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import Avatar from "@material-ui/core/Avatar";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Link from "@material-ui/core/Link";

import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: theme.typography.pxToRem(20),
    flexShrink: 0
  },
  progress: {
    flexBasis: `calc(100% - ${theme.typography.pxToRem(20)})`,
    alignSelf: "center"
  }
}));

function Task2() {
  const [arr1, setArr1] = useState(null);
  const [arr2, setArr2] = useState(null);
  const [arr3, setArr3] = useState(null);
  const [arr4, setArr4] = useState(null);
  const API_LINK = "https://api.myjson.com/bins/";

  useEffect(() => {
    fetch(`${API_LINK}jbdb8`)
      .then(response => response.json())
      .then(response => setArr1(response));
    fetch(`${API_LINK}dllwk`)
      .then(response => response.json())
      .then(response => setArr2(response));
    fetch(`${API_LINK}mj3z8`)
      .then(response => response.json())
      .then(response => setArr3(response));
    fetch("https://api.spacexcom/v3/capsules")
      .then(response => response.json())
      .then(response => setArr4(response));
  }, []);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className="App">
      <ExpansionPanel
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>1</Typography>
          {!arr1 && <LinearProgress className={classes.progress} />}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {arr1 ? (
            <List>
              {arr1.fruits.map((fruit, i) => (
                <ListItem key={i}>
                  <ListItemText primary={fruit} />
                </ListItem>
              ))}
            </List>
          ) : (
            <CircularProgress />
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <ExpansionPanelSummary
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>2</Typography>
          {!arr2 && <LinearProgress className={classes.progress} />}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {arr2 ? (
            <List>
              {arr2.fruits.map(({ name, url }, i) => (
                <ListItem key={i}>
                  <ListItemAvatar>
                    <Avatar alt={name} src={url} />
                  </ListItemAvatar>
                  <ListItemText primary={name} />
                </ListItem>
              ))}
            </List>
          ) : (
            <CircularProgress />
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <ExpansionPanelSummary
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>3</Typography>
          {!arr3 && <LinearProgress className={classes.progress} />}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {arr3 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Website</TableCell>
                  <TableCell>Company</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {arr3.map(row => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>
                      <Link href={`mailto:${row.email}`}>{row.email}</Link>
                    </TableCell>
                    <TableCell>
                      <Typography>Street: {row.address.street}</Typography>
                      <Typography>City: {row.address.city}</Typography>
                    </TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>
                      <Link href={`//${row.website}`}>{row.website}</Link>
                    </TableCell>
                    <TableCell>
                      <Typography>Name: {row.company.name}</Typography>
                      <Typography>
                        Catch phrase: {row.company.catchPhrase}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <CircularProgress />
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <ExpansionPanelSummary
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>4</Typography>
          {!arr4 && <LinearProgress className={classes.progress} />}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {arr4 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Capsule_serial</TableCell>
                  <TableCell>Capsule_id</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Original_launch</TableCell>
                  <TableCell>Original_launch_unix</TableCell>
                  <TableCell>Missions</TableCell>
                  <TableCell>Landings</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Reuse_count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {arr4.map(
                  (
                    {
                      capsule_serial,
                      capsule_id,
                      status,
                      original_launch,
                      original_launch_unix,
                      missions,
                      landings,
                      type,
                      details,
                      reuse_count
                    },
                    i
                  ) => (
                    <TableRow key={i}>
                      <TableCell>{capsule_serial}</TableCell>
                      <TableCell>{capsule_id}</TableCell>
                      <TableCell>{status}</TableCell>
                      <TableCell>{original_launch}</TableCell>
                      <TableCell>{original_launch_unix}</TableCell>
                      <TableCell>
                        {missions.map(({ name, flight }) => (
                          <React.Fragment>
                            <Typography>Name: {name}</Typography>
                            <Typography>Flight: {flight}</Typography>
                          </React.Fragment>
                        ))}
                      </TableCell>
                      <TableCell>{landings}</TableCell>
                      <TableCell>{type}</TableCell>
                      <TableCell>{details}</TableCell>
                      <TableCell>{reuse_count}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          ) : (
            <CircularProgress />
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

export default Task2;
