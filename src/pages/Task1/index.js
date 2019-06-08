import React from "react";

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

import { arr1, arr2, arr3, arr4 } from "../../fixtures";

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  }
}));

function Task1() {
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
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List>
            {arr1.fruits.map((fruit, i) => (
              <ListItem key={i}>
                <ListItemText primary={fruit} />
              </ListItem>
            ))}
          </List>
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
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
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
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
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
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
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
                ({
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
                }) => (
                  <TableRow key={capsule_serial}>
                    <TableCell>{capsule_serial}</TableCell>
                    <TableCell>{capsule_id}</TableCell>
                    <TableCell>{status}</TableCell>
                    <TableCell>{original_launch}</TableCell>
                    <TableCell>{original_launch_unix}</TableCell>
                    <TableCell>
                      {missions.map(({ name, flight }, i) => (
                        <React.Fragment key={i}>
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
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

export default Task1;
