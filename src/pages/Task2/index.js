import React, { useState, useEffect } from "react";

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

import Panel from "../../components/Panel";

function Task2() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
    fetch("https://api.spacexdata.com/v3/capsules")
      .then(response => response.json())
      .then(response => setArr4(response));
  }, []);

  return (
    <div className="App">
      <Panel
        name="panel1"
        title="1"
        isDataLoaded={!!arr1}
        expanded={expanded}
        handleChange={handleChange}
      >
        <List>
          {arr1 &&
            arr1.fruits.map((fruit, i) => (
              <ListItem key={i}>
                <ListItemText primary={fruit} />
              </ListItem>
            ))}
        </List>
      </Panel>
      <Panel
        name="panel2"
        title="2"
        isDataLoaded={!!arr2}
        expanded={expanded}
        handleChange={handleChange}
      >
        <List>
          {arr2 &&
            arr2.fruits.map(({ name, url }, i) => (
              <ListItem key={i}>
                <ListItemAvatar>
                  <Avatar alt={name} src={url} />
                </ListItemAvatar>
                <ListItemText primary={name} />
              </ListItem>
            ))}
        </List>
      </Panel>
      <Panel
        name="panel3"
        title="3"
        isDataLoaded={!!arr3}
        expanded={expanded}
        handleChange={handleChange}
      >
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
            {arr3 &&
              arr3.map(row => (
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
      </Panel>
      <Panel
        name="panel4"
        title="4"
        isDataLoaded={!!arr4}
        expanded={expanded}
        handleChange={handleChange}
      >
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
            {arr4 &&
              arr4.map(
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
                    <TableCell>{capsule_serial || "—"}</TableCell>
                    <TableCell>{capsule_id || "—"}</TableCell>
                    <TableCell>{status || "—"}</TableCell>
                    <TableCell>{original_launch || "—"}</TableCell>
                    <TableCell>{original_launch_unix || "—"}</TableCell>
                    <TableCell>
                      {missions.length > 0
                        ? missions.map(({ name, flight }, i) => (
                            <React.Fragment key={i}>
                              <Typography>Name: {name}</Typography>
                              <Typography>Flight: {flight}</Typography>
                            </React.Fragment>
                          ))
                        : "—"}
                    </TableCell>
                    <TableCell>{landings}</TableCell>
                    <TableCell>{type || "—"}</TableCell>
                    <TableCell>{details || "—"}</TableCell>
                    <TableCell>{reuse_count}</TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}

export default Task2;
