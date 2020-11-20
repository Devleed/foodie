import createDataContext from '../createDataContext';
import actions from './actions';
import reducer from './reducer';

const INITIAL_STATE = {};

export const { Context, Provider } = createDataContext(
  reducer,
  actions,
  INITIAL_STATE,
);
