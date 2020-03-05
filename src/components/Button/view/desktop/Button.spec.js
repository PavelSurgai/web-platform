import React from 'react';
import { shallow } from 'enzyme';
import block from 'bem-cn';

import Button from './Button';

describe('Button desktop tests', () => {
  const b = block('button');
  
  describe('Button with text', () => {
    const props = { text: 'Test text' };

    const button = shallow(<Button {...props} />);

    it('render properly', () => {
      expect(button).toMatchSnapshot();
    });

    it('render text', () => {
      expect(button.find('button').text()).toEqual(props.text);
    });
  });

  describe('Button with link', () => {
    const props = {
      text: 'Test link button',
      link: '/test-button',
    };

    const button = shallow(<Button {...props} />);

    it('render properly', () => {
      expect(button).toMatchSnapshot();
    });

    it('render link', () => {
      expect(button.find('Link')).toHaveLength(1);
    });

    it('render link with "to"', () => {
      expect(button.find('Link').props().to).toEqual(props.link);
    });
  });

  describe('Button with type', () => {
    const props = {
      text: 'Test',
    };

    it('Default type button', () => {
      const nextProps = {
        ...props,
      };

      const button = shallow(<Button {...nextProps} />);
      expect(button.find('button').props().type).toEqual('button');
    });

    it('Submit type button', () => {
      const nextProps = {
        ...props,
        type: 'submit',
      };

      const button = shallow(<Button {...nextProps} />);

      expect(button.find('button').props().type).toEqual(nextProps.type);
    });
  });

  describe('Button with modificators', () => {
    const props = {
      text: 'Test mods',
    };

    it('Have default modificators', () => {
      const className = b({ sizable: 'default' }, { disable: false }, { colors: 'green' });
      const button = shallow(<Button {...props} />);

      expect(button.find('button').props().className.toString()).toEqual(className.toString());
    });

    it('Different modificators', () => {
      const nextProps = {
        ...props,
        size: 'big',
        disabled: true,
        color: 'red',
      };
      const className = b({ sizable: nextProps.size }, { disable: true }, { colors: nextProps.color });
      const button = shallow(<Button {...nextProps} />);

      expect(button.find('button').props().className.toString()).toEqual(className.toString());
    });
  });

  describe('Test callBack work', () => {
    const mockCallBack = jest.fn();
    const props = {
      text: 'Test',
      callBack: mockCallBack,
    };

    it('onClick working', () => {
      const button = shallow(<Button {...props} />);

      button.find('button').simulate('click');

      expect(mockCallBack).toHaveBeenCalledTimes(1);
    });

    it('onClick multiply times', () => {
      const button = shallow(<Button {...props} />);

      button.find('button').simulate('click');
      button.find('button').simulate('click');
      button.find('button').simulate('click');

      expect(mockCallBack).toHaveBeenCalledTimes(3);
    });

    it('onClick disabled', () => {
      const nextProps = { ...props, disabled: true };
      const button = shallow(<Button {...nextProps} />);

      button.find('button').simulate('click');
      button.find('button').simulate('click');
      button.find('button').simulate('click');

      expect(mockCallBack).toHaveBeenCalledTimes(0);
    });
  });
});