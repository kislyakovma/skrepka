import actions from './actions';

const initialState = {
  data: [],
  loading: false,
};

const { COMPANY_BEGIN, PULL_COMPANY, PUSH_COMPANY } = actions;

const companyReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case COMPANY_BEGIN:
      return { ...initialState, loading: true };
    case PUSH_COMPANY:
      return {
        ...initialState,
        data: state.data.concat(data),
        loading: false,
      };
    case PULL_COMPANY:
      return {
        ...initialState,
        data,
        loading: false,
      };
    default:
      return state;
  }
};

export default companyReducer;
