import React from 'react';
import { mount } from 'enzyme';

import uuid from 'uuid/v4';
import useLocalStorage from 'react-use-localstorage';

import Proposals from './Proposals';

describe('<Proposals />', () => {
  it('should delete proposal from localeStorage and viewport', () => {
    // const component = mount(<Proposals />);
    const [proposals, setProposals] = useLocalStorage('proposals', '');

    const mockProposals = {
      [uuid()]: {},
      [uuid()]: {},
      [uuid()]: {},
      [uuid()]: {},
      [uuid()]: {}
    };

    setProposals(JSON.stringify(mockProposals));
  });
});
