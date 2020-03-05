import { payHistory } from 'shared/__mock__/results';
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

  it(actionTypes.GET_PAYHISTORY, () => {
    const stateBefore = {
      ...initialState,
      actionProcessing: true,
    };

    const payload = { payHistory };

    const action = { type: actionTypes.GET_PAYHISTORY, payload };

    expect(reducer(stateBefore, action)).toEqual({
      ...initialState,
      history: payload,
      actionProcessing: false,
    });
  });
});