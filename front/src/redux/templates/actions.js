const actions = {
  PUSH_TEMPLATE: 'PUSH_TEMPLATE',
  PULL_TEMPLATE: 'PULL_TEMPLATE',
  TEMPLATES_BEGIN: 'TEMPLATES_BEGIN',

  pushTemplate: (data) => {
    return {
      type: actions.PUSH_TEMPLATE,
      data,
    };
  },

  pullTemplate: (data) => {
    return {
      type: actions.PULL_TEMPLATE,
      data,
    };
  },

  templatesBegin: () => {
    return {
      type: actions.TEMPLATES_BEGIN,
    };
  },
};

export default actions;
