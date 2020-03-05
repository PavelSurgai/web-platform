import React from 'react';
import { shallow } from 'enzyme';
import block from 'bem-cn';

import Select from './Select';

describe('Select tests', () => {
  const b = block('select');
  const props = {
    items: [{ name: 'testName', value: 'testValue' }],
    activeItem: { name: 'test' },
    onChange: jest.fn(),
  };

  describe('Select with value', () => {
    const select = shallow(<Select {...props} />);

    it('render properly', () => {
      expect(select).toMatchSnapshot();
    });

    it('check render empty ul', () => {
      expect(select.find('ul')).toEqual({});
    });
  });

  describe('Select have modificators', () => {
    it('Div 0 have different modificators', () => {
      const className = b({ open: false });
      const select = shallow(<Select {...props} />);

      expect(select.find('div').at(0).props().className.toString()).toEqual(className.toString());
    });

    it('Div 1 have different modificators', () => {
      const className = b('item', { current: true });
      const select = shallow(<Select {...props} />);

      expect(select.find('div').at(1).props().className.toString()).toEqual(className.toString());
    });
  });
});