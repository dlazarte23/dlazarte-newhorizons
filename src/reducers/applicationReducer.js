const applicationReducer = (state = {}, action) => {
  switch (action.type) {
    case "refreshIsAuthenticated":
      return {
        ...state,
        isAuthenticated: !!localStorage.getItem("IS_AUTHENTICATED"),
      };
    case "refreshAlertMessage":
      return { ...state, alertMessage: action.payload };
    case "refreshModal":
      return { ...state, modal: action.payload };
    default:
      return state;
  }
};

export default applicationReducer;
