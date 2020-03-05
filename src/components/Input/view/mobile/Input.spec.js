import React from 'react';
import { shallow } from 'enzyme';
import block from 'bem-cn';

import Input from './Input';

describe('Input tests', () => {
  const b = block('input');
  const props = {
    value: 'Jopa',
    callBack: jest.fn(),
    name: 'Jopa',
    placeholder: 'Test placeholder',
    type: 'Jopa',
    isRequired: true,
    size: 'low',
  };

  describe('Input with value', () => {
    const input = shallow(<Input {...props} />);

    it('render properly', () => {
      expect(input).toMatchSnapshot();
    });

    it('render value', () => {
      expect(input.find('input').props().value).toEqual(props.value);
    });

    it('render name', () => {
      expect(input.find('input').props().name).toEqual(props.name);
    });

    it('render placeholder', () => {
      expect(input.find('input').props().placeholder).toEqual(props.placeholder);
    });

    it('render type', () => {
      expect(input.find('input').props().type).toEqual(props.type);
    });

    it('render required', () => {
      expect(input.find('input').props().required).toEqual(props.isRequired);
    });
  });

  describe('Input have modificators', () => {
    const defaultProps = {
      size: undefined,
      type: undefined,
    };
    it('Have default modificators', () => {
      const className = b({ sizable: 'default' }, { type: 'text' });
      const input = shallow(<Input {...{ ...props, ...defaultProps }} />);

      expect(input.find('input').props().className.toString()).toEqual(className.toString());
    });

    it('Have different modificators', () => {
      const className = b({ sizable: props.size }, { type: props.type });
      const input = shallow(<Input {...props} />);

      expect(input.find('input').props().className.toString()).toEqual(className.toString());
    });
  });

  describe('Callback test', () => {
    it('onChange test', () => {
      const input = shallow(<Input {...props} />);

      input.find('input').simulate('change', 'test');
      expect(props.callBack).toBeCalledWith('test');
    });
  });
});