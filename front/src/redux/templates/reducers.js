import actions from './actions';

const initialState = {
  data: []
};

const { PUSH_TEMPLATE, PULL_TEMPLATE } = actions;

const ordersReducer = (state = initialState, action) => {
  const { type, data} = action;
  switch (type) {
    case PUSH_TEMPLATE:
      return {
        ...initialState,
        data: state.data.concat(data),
      };
    case PULL_TEMPLATE:
      return {
        ...initialState,
        data
      };
    default:
      return state;
  }
};

export default ordersReducer;
