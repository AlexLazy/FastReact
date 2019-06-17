import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import Avatar from '@material-ui/core/Avatar';

interface FruitsWithAvatarProps {
  data: {
    fruits: {
      name: string;
      url: string;
    }[];
  } | null;
}

const FruitsWithAvatar: React.FC<FruitsWithAvatarProps> = ({ data }) => {
  return (
    <List>
      {data &&
        data.fruits.map(({ name, url }, i) => (
          <ListItem key={i}>
            <ListItemAvatar>
              <Avatar alt={name} src={url} />
            </ListItemAvatar>
            <ListItemText primary={name} />
          </ListItem>
        ))}
    </List>
  );
};

export default FruitsWithAvatar;
