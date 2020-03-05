import { reducer } from '../redux/reducer';
import { initialState } from '../redux/initial';
import { actionTypes } from '../redux/actions';

describe('Results feature reducer tests', () => {
  it(actionTypes.ACTION_PROCESSING, () => {
    const action = { type: actionTypes.ACTION_PROCESSING };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      actionProcessing: true,
    });
  });

  it(actionTypes.ACTION_FAILURE, () => {
    const action = { type: actionTypes.ACTION_FAILURE };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      actionProcessing: false,
    });
  });

  it(actionTypes.GET_TOURNAMENTS, () => {
    const stateBefore = {
      ...initialState,
      actionProcessing: true,
    };

    const payload = [1, 2, 3];

    const action = { type: actionTypes.GET_TOURNAMENTS, payload };

    expect(reducer(stateBefore, action)).toEqual({
      ...initialState,
      tournaments: payload,
      actionProcessing: false,
    });
  });

  it(actionTypes.GET_SPORTS, () => {
    const stateBefore = {
      ...initialState,
      actionProcessing: true,
    };
    
    const payload = [
      { value: 1, name: 'futebool' },
      { value: 2, name: 'futebool' },
      { value: 123, name: 'asfdaeee' },
    ];

    const action = { type: actionTypes.GET_SPORTS, payload };

    expect(reducer(stateBefore, action)).toEqual({
      ...initialState,
      sports: payload,
      actionProcessing: false,
    });
  });

  it(actionTypes.GET_RESULTS, () => {
    const stateBefore = {
      ...initialState,
      actionProcessing: true,
    };

    const payload = { value: 'value' };

    const action = { type: actionTypes.GET_RESULTS, payload };

    expect(reducer(stateBefore, action)).toEqual({
      ...initialState,
      results: payload,
      actionProcessing: false,
    });
  });
});