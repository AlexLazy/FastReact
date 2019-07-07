import React, { FC, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import { Card, Icon, Avatar } from 'antd';
import { makeStyles } from '@material-ui/core/styles';

interface ProposalCardProps {
  id: string;
  data: {
    username: string;
    lastname: string;
    vehicleName: string;
    avatar: {
      file: {
        thumbUrl: string;
      };
    };
    photo: {
      file: {
        thumbUrl: string;
      };
    };
  };
  onDelete: (e: MouseEvent<HTMLElement>) => void;
}

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.typography.pxToRem(16)
  }
}));

const ProposalCard: FC<ProposalCardProps> = ({ id, data, onDelete }) => {
  const classes = useStyles();
  const { Meta } = Card;
  const { vehicleName, username, lastname, avatar, photo } = data;
  console.log(avatar);

  return (
    <Card
      className={classes.card}
      cover={<img alt={vehicleName} src={photo.file.thumbUrl} />}
      actions={[
        <Link to={`/proposals/${id}`}>
          <Icon type='eye' />
        </Link>,
        <Link to={`/proposals/${id}/edit`}>
          <Icon type='edit' />
        </Link>,
        <Icon type='delete' onClick={onDelete} />
      ]}
    >
      <Meta
        avatar={<Avatar src={avatar.file.thumbUrl} />}
        title={vehicleName}
        description={`${username} ${lastname}`}
      />
    </Card>
  );
};

export default ProposalCard;
