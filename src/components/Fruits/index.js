import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function Fruits({ data }) {
  return (
    <List>
      {data &&
        data.fruits.map((fruit, i) => (
          <ListItem key={i}>
            <ListItemText primary={fruit} />
          </ListItem>
        ))}
    </List>
  );
}

export default Fruits;
