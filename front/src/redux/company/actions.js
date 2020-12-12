const actions = {
  PUSH_COMPANY: 'PUSH_COMPANY',
  PULL_COMPANY: 'PULL_COMPANY',
  COMPANY_BEGIN: 'COMPANY_BEGIN',

  pushCompany: (data) => {
    return {
      type: actions.PUSH_COMPANY,
      data,
    };
  },

  pullCompany: (data) => {
    return {
      type: actions.PULL_COMPANY,
      data,
    };
  },

  companyBegin: () => {
    return {
      type: actions.COMPANY_BEGIN,
    };
  },
};

export default actions;
