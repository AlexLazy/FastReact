import React, { FC, MouseEvent } from 'react';

import useLocalStorage from 'react-use-localstorage';

import { Row, Col } from 'antd';

import { PROPOSAL_ADD } from '../../constants';

import ProposalCard from '../ProposalCard';
import AddButton from '../AddButton';

const Proposals: FC = () => {
  const [proposals, setProposals] = useLocalStorage('proposals', '');
  const proposalsList = JSON.parse(proposals);

  const handleDelete = (id: string) => (e: MouseEvent<HTMLElement>) => {
    const proposalsNew = Object.keys(proposalsList).reduce(
      (acc, proposalId) =>
        proposalId === id
          ? acc
          : { ...acc, [proposalId]: proposalsList[proposalId] },
      {}
    );

    setProposals(JSON.stringify(proposalsNew));
  };

  return (
    <section style={{ width: '100%', maxWidth: 1200, margin: '30px auto' }}>
      <Row gutter={16}>
        {proposalsList &&
          Object.keys(proposalsList).map(proposalId => (
            <Col className='gutter-row' span={6} key={proposalId}>
              <ProposalCard
                id={proposalId}
                data={proposalsList[proposalId]}
                onDelete={handleDelete(proposalId)}
              />
            </Col>
          ))}
      </Row>
      <AddButton url={PROPOSAL_ADD} />
    </section>
  );
};

export default Proposals;
