import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

interface AddButton {
  url: string;
}
const AddButton: FC<AddButton> = ({ url }) => {
  return (
    <Link to={url}>
      <Button
        style={{ position: 'fixed', bottom: 25, right: 25 }}
        type='primary'
        shape='circle'
        icon='plus'
        size='large'
      />
    </Link>
  );
};

export default AddButton;
