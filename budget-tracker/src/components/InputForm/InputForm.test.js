import React from 'react';
import { shallow } from 'enzyme';
import InputForm from './InputForm';

describe('InputForm', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<InputForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
