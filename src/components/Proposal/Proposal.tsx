import React, { FC } from 'react';
import { Link, match } from 'react-router-dom';

import useLocalStorage from 'react-use-localstorage';

import { Descriptions, Avatar, Button } from 'antd';

import { PROPOSAL_ADD } from '../../constants';

import AddButton from '../AddButton';

interface RouteParams {
  id: string;
}

interface ProposalProps {
  match: match<RouteParams>;
}
const Proposal: FC<ProposalProps> = ({ match }) => {
  const [proposals, setProposals] = useLocalStorage('proposals', '');
  const {
    username,
    usernameLat,
    lastname,
    lastnameLat,
    email,
    phone,
    avatar,
    vehicleName,
    capacity,
    isComeback,
    comeback,
    recording,
    recordingSpeed,
    photo
  } = JSON.parse(proposals)[match.params.id];

  return (
    <section style={{ width: '100%', maxWidth: 1200, margin: '30px auto' }}>
      <Link to='/proposals'>
        <Button type='primary' icon='left'>
          Назад к заявкам
        </Button>
      </Link>
      &nbsp;
      <Link to={`/proposals/${match.params.id}/edit`}>
        <Button type='primary' icon='edit'>
          Редактировать заявку
        </Button>
      </Link>
      <Descriptions
        title='Подробная информация о заявке'
        bordered
        column={1}
        size='small'
      >
        <Descriptions.Item label='Имя'>{username}</Descriptions.Item>
        <Descriptions.Item label='Имя латиницей'>
          {usernameLat}
        </Descriptions.Item>
        <Descriptions.Item label='Фамилия'>{lastname}</Descriptions.Item>
        <Descriptions.Item label='Фамилия латиницей'>
          {lastnameLat}
        </Descriptions.Item>
        <Descriptions.Item label='E-mail'>{email}</Descriptions.Item>
        <Descriptions.Item label='Номер телефона'>{phone}</Descriptions.Item>
        <Descriptions.Item label='Личная фотография'>
          <Avatar src={avatar.file.thumbUrl} shape='square' size='large' />
        </Descriptions.Item>
        <Descriptions.Item label='Возможность вернуться из черной дыры'>
          {vehicleName}
        </Descriptions.Item>
        <Descriptions.Item label='Название летательного средства'>
          {capacity}л
        </Descriptions.Item>
        <Descriptions.Item label='Возможность вернуться из черной дыры'>
          {isComeback ? `${comeback}%` : 'Нет'}
        </Descriptions.Item>
        <Descriptions.Item label='Наличие записывающих средств, позволяющих передавать данные из черной дыры'>
          {recording === 'no'
            ? 'Нет'
            : recording === 'yes'
            ? `Да: ${recordingSpeed}Гб/с`
            : `Частично: ${recordingSpeed}Гб/с`}
        </Descriptions.Item>
        <Descriptions.Item label='Фото летательного транспорта'>
          <Avatar src={photo.file.thumbUrl} shape='square' size='large' />
        </Descriptions.Item>
      </Descriptions>
      <AddButton url={PROPOSAL_ADD} />
    </section>
  );
};

export default Proposal;
