import React from 'react';
import { shallow } from 'enzyme';

import checkImg from '../img/check.png';
import CheckBox from './CheckBox';

describe('Button desktop tests', () => {
  const props = { checked: true, callBack: jest.fn(), name: 'test' };
  
  describe('CheckBox tests', () => {
    const checkBox = shallow(<CheckBox {...props} />);

    it('render properly', () => {
      expect(checkBox).toMatchSnapshot();
    });

    it('render checked', () => {
      expect(checkBox.find('div').find('input').props().checked).toEqual(props.checked);
    });

    it('render name', () => {
      expect(checkBox.find('input').props().name).toEqual(props.name);
    });
  });

  describe('Callback test', () => {
    it('onChange test', () => {
      const checkBox = shallow(<CheckBox {...props} />);

      checkBox.find('div').find('input').simulate('change', false);
      expect(props.callBack).toBeCalledWith(false);
    });
  });

  describe('Is checked img', () => {
    it('is checked', () => {
      const checkBox = shallow(<CheckBox {...props} />);
      expect(checkBox.find('div').find('img').props().src).toEqual(checkImg);
    });
  });
});