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
      const { event, items } = action;
      return Object.assign({}, state, {
        participants: event.target.value.trim().split(",").filter(name => name.length > 0).map(participant => 
          Object.assign({}, {
            id: generateRandomId(),
            name: participant.trim()
          })
        ),
        items: items.map(item =>
          Object.assign(item, {
            ...item,
            yesNoList: event.target.value.trim().split(",").filter(name => name.length > 0).map(() => true)
          })
        )
      });
    }
    case 'UPDATE_ITEMS': {
      const { event, participants } = action;
      return Object.assign({}, state, {
        items: event.target.value.trim().split(",").filter(item => item.length > 0).map(item =>
          Object.assign({}, {
            id: generateRandomId(),
            name: item.split("$").length > 1 ? item.split("$")[0].trim() : item,
            price: item.split("$").length > 1 ? parseFloat(item.split("$")[1].trim(), 10) : 0,
            yesNoList: participants.map(() => true)
          })
        ),
      });
    }

    case 'UPDATE_YESNO': {
      const { items, itemId, participants, participant } = action;
      const index = participants.map((p, index) => {
        if (p.name.toUpperCase() === participant) {
          return index
        }
      }).filter(index => index !== undefined)[0];

      const yesNoList = items.find(element => { return element.id === itemId }).yesNoList;
      const yesNo = yesNoList[index]
      
      yesNoList.splice(index, 1, !yesNo);

      return Object.assign({}, state, {
        items: items.map(item => {
          if(item.id === itemId) {
            return Object.assign({}, {
              ...item,
              yesNoList: yesNoList
            })
          } else {
            return Object.assign({}, item)
          }
        })
      });
    }
    default: return state;
  };
};

export default userDataReducer;