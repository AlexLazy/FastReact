import React, { Fragment, useState, useEffect, FC, MouseEvent } from 'react';

import Panel from '../../components/Panel';
import Fruits from '../../components/Fruits';
import FruitsWithAvatar from '../../components/FruitsWithAvatar';
import Users from '../../components/Users';
import Capsules from '../../components/Capsules';

const Task2: FC = () => {
  const [expanded, setExpanded] = useState<string>('');

  const handleChange = (panel: string) => (
    event: MouseEvent<HTMLElement>,
    isExpanded: string
  ) => {
    setExpanded(isExpanded ? panel : '');
  };

  const [arr1, setArr1] = useState(null);
  const [arr2, setArr2] = useState(null);
  const [arr3, setArr3] = useState(null);
  const [arr4, setArr4] = useState(null);

  const API_LINK = 'https://api.myjson.com/bins/';

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
    fetch('https://api.spacexdata.com/v3/capsules')
      .then(response => response.json())
      .then(response => setArr4(response));
  }, []);

  return (
    <Fragment>
      <Panel
        name='panel1'
        title='1'
        isDataLoaded={!!arr1}
        expanded={expanded}
        handleChange={handleChange}
      >
        <Fruits data={arr1} />
      </Panel>
      <Panel
        name='panel2'
        title='2'
        isDataLoaded={!!arr2}
        expanded={expanded}
        handleChange={handleChange}
      >
        <FruitsWithAvatar data={arr2} />
      </Panel>
      <Panel
        name='panel3'
        title='3'
        isDataLoaded={!!arr3}
        expanded={expanded}
        handleChange={handleChange}
      >
        <Users data={arr3} />
      </Panel>
      <Panel
        name='panel4'
        title='4'
        isDataLoaded={!!arr4}
        expanded={expanded}
        handleChange={handleChange}
      >
        <Capsules data={arr4} />
      </Panel>
    </Fragment>
  );
};

export default Task2;
