const characterReducer = (state = {}, action) => {
  switch (action.type) {
    case "refreshCharacter":
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};

export default characterReducer;
