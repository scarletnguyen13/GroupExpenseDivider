function generateRandomId() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return `_${Math.random().toString(36).substr(2, 9)}`;
}

const INITIAL_STATE = {
  participants: [],
  items: []
}

const userDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_PARTICIPANTS': {
      const { event } = action.payload;
      return Object.assign({}, state, {
        participants: event.target.value.trim().split(",").filter(name => name.length > 0).map(participant => 
          Object.assign(participant, {
            id: generateRandomId(),
            name: participant.trim()
          })
        ),
      });
    }
    case 'UPDATE_ITEMS': {
      console.log(state.participants)
      const { event } = action.payload;
      return Object.assign({}, state, {
        items: event.target.value.trim().split(",").filter(item => item.length > 0).map(item =>
          Object.assign(item, {
            id: generateRandomId(),
            name: item.split("$").length > 1 ? item.split("$")[0].trim() : item,
            price: item.split("$").length > 1 ? parseFloat(item.split("$")[1].trim(), 10) : 0
          })
        ),
      });
    }
    default: {
      console.log(state);
      return state;
    }
  };
};

export default userDataReducer;