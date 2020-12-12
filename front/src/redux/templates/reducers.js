import actions from './actions';

const initialState = {
  data: [],
  loading: false,
};

const { PUSH_TEMPLATE, PULL_TEMPLATE, TEMPLATES_BEGIN } = actions;

const templatesReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case TEMPLATES_BEGIN:
      return { ...initialState, loading: true };
    case PUSH_TEMPLATE:
      return {
        ...initialState,
        data: state.data.concat(data),
        loading: false,
      };
    case PULL_TEMPLATE:
      return {
        ...initialState,
        data,
        loading: false,
      };
    default:
      return state;
  }
};

export default templatesReducer;
