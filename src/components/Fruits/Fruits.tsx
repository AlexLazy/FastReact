import React, { FC } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

interface FruitsProps {
  data: {
    fruits: {
      name: string;
      url: string;
    }[];
  } | null;
}

const Fruits: FC<FruitsProps> = ({ data }) => {
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
};

export default Fruits;
