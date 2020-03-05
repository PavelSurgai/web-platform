import React from 'react';
import { shallow } from 'enzyme';
import block from 'bem-cn';

import { SwitchBox } from './SwitchBox';

describe('SwitchBox tests', () => {
  const b = block('switch-box');
  const props = {
    isActive: true,
    callBack: jest.fn(),
  };
  const className = b({ active: props.isActive });

  describe('SwitchBox with props', () => {
    const switchBox = shallow(<SwitchBox {...props} />);

    it('render properly', () => {
      expect(switchBox).toMatchSnapshot();
    });
  });

  describe('SwitchBox have modificators', () => {
    it('Have modificators', () => {
      const switchBox = shallow(<SwitchBox {...props} />);

      expect(switchBox.find(`div.${b().toString()}`).props().className.toString()).toEqual(className.toString());
    });
  });

  describe('Callback test', () => {
    it('onClick working', () => {
      const switchBox = shallow(<SwitchBox {...props} />);
      switchBox.find(`div.${b().toString()}`).simulate('click');
      expect(props.callBack).toHaveBeenCalledTimes(1);
    });

    it('onClick multiply times', () => {
      const switchBox = shallow(<SwitchBox {...props} />);

      switchBox.find(`div.${b().toString()}`).simulate('click');
      switchBox.find(`div.${b().toString()}`).simulate('click');
      switchBox.find(`div.${b().toString()}`).simulate('click');

      expect(props.callBack).toHaveBeenCalledTimes(3);
    });
  });
});