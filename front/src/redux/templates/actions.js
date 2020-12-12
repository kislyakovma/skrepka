const actions = {
    PUSH_TEMPLATE: 'PUSH_TEMPLATE',
    PULL_TEMPLATE: 'PULL_TEMPLATE',
  
    pushTemplate: data => {
      return {
        type: actions.PUSH_TEMPLATE,
        data
      };
    },
  
    pullTemplate: data => {
      return {
        type: actions.PULL_TEMPLATE,
        data
      };
    },
  };
  
  export default actions;
  