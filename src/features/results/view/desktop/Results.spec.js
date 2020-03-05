import React from 'react';
import { shallow } from 'enzyme';

import ConnectedResults, { Results } from './Results';

describe('Results component tests', () => {
  const props = {
    locale: {},
    sports: [],
    tournaments: [],
    getSports: t => t,
    getTournaments: t => t,
    getResults: t => t,
    results: {},
    actionProcessing: false,
  };

  it('render Spinner', () => {
    const nextProps = {
      ...props,
      actionProcessing: true,
    };
    const component = shallow(<Results {...nextProps} />);

    expect(component.find('Spinner')).toHaveLength(1);
  });
});