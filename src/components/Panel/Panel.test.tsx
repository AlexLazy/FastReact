import React from 'react';
import { shallow } from 'enzyme';

import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

import Panel from './Panel';

describe('<Panel />', () => {
  it('render child component', () => {
    const child = <div>Child Component</div>;
    const component = shallow(
      <Panel
        name='panel1'
        title='1'
        isDataLoaded={true}
        expanded={'panel1'}
        handleChange={() => {}}
      >
        {child}
      </Panel>
    );

    expect(component).toContainReact(child);
  });

  it('shows progress bars', () => {
    const child = <div>Child Component</div>;
    const component = shallow(
      <Panel
        name='panel1'
        title='1'
        isDataLoaded={false}
        expanded={'panel1'}
        handleChange={() => {}}
      >
        {child}
      </Panel>
    );

    expect(component.find(CircularProgress)).toHaveLength(1);
    expect(component.dive().find(LinearProgress)).toHaveLength(1);
  });

  it('hides progress bars', () => {
    const child = <div>Child Component</div>;
    const component = shallow(
      <Panel
        name='panel1'
        title='1'
        isDataLoaded={true}
        expanded={'panel1'}
        handleChange={() => {}}
      >
        {child}
      </Panel>
    );

    expect(component.find(CircularProgress)).toHaveLength(0);
    expect(component.dive().find(LinearProgress)).toHaveLength(0);
  });
});
