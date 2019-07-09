import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import FlyingVehicleForm from './FlyingVehicleForm';

describe('<FlyingVehicleForm />', () => {
  it('should change user input and set it to other input component', () => {
    const component = mount(
      <BrowserRouter>
        <FlyingVehicleForm />
      </BrowserRouter>
    );
    const input = component.find('Input#flying_vehicle_username');

    input.simulate('change', {
      target: { value: 'яЯюЮщЩшШчЧжЖхХьъdD' }
    });

    expect(
      component.find('Input#flying_vehicle_usernameLat').prop('value')
    ).toBe('yaYayuYushShshShchChzhZhhHdD');
  });

  it('hide input when user select no', () => {
    const component = mount(
      <BrowserRouter>
        <FlyingVehicleForm />
      </BrowserRouter>
    );

    expect(
      component.find({ label: 'Вероятность вернуться из черной дыры' }).get(0)
        .props.style
    ).toHaveProperty('display', 'none');

    const input1 = component.find('RadioGroup#flying_vehicle_isComeback');

    input1
      .findWhere(n => n.name() === 'input' && n.prop('value') === 'yes')
      .simulate('change', { target: { checked: true } });

    expect(
      component.find({ label: 'Вероятность вернуться из черной дыры' }).get(0)
        .props.style
    ).toHaveProperty('display', 'block');

    expect(
      component.find({ label: 'Скорость передачи информации' }).get(0).props
        .style
    ).toHaveProperty('display', 'none');

    const input2 = component.find('RadioGroup#flying_vehicle_recording');

    input2
      .findWhere(n => n.name() === 'input' && n.prop('value') === 'yes')
      .simulate('change', { target: { checked: true } });

    expect(
      component.find({ label: 'Скорость передачи информации' }).get(0).props
        .style
    ).toHaveProperty('display', 'block');

    input2
      .findWhere(n => n.name() === 'input' && n.prop('value') === 'no')
      .simulate('change', { target: { checked: true } });

    expect(
      component.find({ label: 'Скорость передачи информации' }).get(0).props
        .style
    ).toHaveProperty('display', 'none');

    input2
      .findWhere(n => n.name() === 'input' && n.prop('value') === 'partial')
      .simulate('change', { target: { checked: true } });

    expect(
      component.find({ label: 'Скорость передачи информации' }).get(0).props
        .style
    ).toHaveProperty('display', 'block');
  });
});
