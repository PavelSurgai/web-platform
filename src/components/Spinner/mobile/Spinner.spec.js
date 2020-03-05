import React from 'react';
import { shallow } from 'enzyme';
import block from 'bem-cn';

import { Spinner } from './Spinner';

describe('Spinner tests', () => {
  const b = block('spinner');
  const props = {
    isLoading: true,
    size: 'low',
  };

  describe('Spinner with props', () => {
    const spinner = shallow(<Spinner {...props} />);

    it('render properly', () => {
      expect(spinner).toMatchSnapshot();
    });
  });

  describe('isLoading false render empty object', () => {
    const spinner = shallow(<Spinner isLoading={false} />);

    it('render empty object', () => {
      expect(spinner).toEqual({});
    });
  });

  describe('Spinner have modificators', () => {
    it('Have default modificators', () => {
      const className = b('wrapper', { loading: props.isLoading });
      const defaultProps = { isLoading: true };
      const spinner = shallow(<Spinner {...defaultProps} />);

      expect(spinner.find('div').props().className.toString()).toEqual(className.toString());
    });

    it('Have default modificators', () => {
      const className = b('logo');
      const spinner = shallow(<Spinner {...props} />);

      expect(spinner.find('div').find('img').props().className.toString()).toEqual(className.toString());
    });
  });
});