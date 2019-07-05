import React from 'react';
import { mount } from 'enzyme';

import FlyingVehicleForm from './FlyingVehicleForm';

describe('<FlyingVehicleForm />', () => {
  it('should change user input and set it to other input component', () => {
    const component = mount(<FlyingVehicleForm />);
    const input = component.find('Input#flying_vehicle_username');

    input.simulate('change', {
      target: { value: 'яЯюЮщЩшШчЧжЖхХьъdD' }
    });

    expect(
      component.find('Input#flying_vehicle_usernameLat').prop('value')
    ).toBe('yaYayuYushShshShchChzhZhhHdD');
  });

  it('hide input when user select no', () => {
    const component = mount(<FlyingVehicleForm />);

    expect(
      component.find('InputNumber#flying_vehicle_recordingSpeed')
    ).toHaveLength(0);

    const input = component.find('RadioGroup#flying_vehicle_recording');

    input
      .findWhere(n => n.name() === 'input' && n.prop('value') === 'yes')
      .simulate('change', { target: { checked: true } });
    expect(
      component.find('InputNumber#flying_vehicle_recordingSpeed').first()
    ).toHaveLength(1);

    input
      .findWhere(n => n.name() === 'input' && n.prop('value') === 'partial')
      .simulate('change', { target: { checked: true } });
    expect(
      component.find('InputNumber#flying_vehicle_recordingSpeed').first()
    ).toHaveLength(1);

    input
      .findWhere(n => n.name() === 'input' && n.prop('value') === 'no')
      .simulate('change', { target: { checked: true } });
    expect(
      component.find('InputNumber#flying_vehicle_recordingSpeed')
    ).toHaveLength(0);
  });
});
