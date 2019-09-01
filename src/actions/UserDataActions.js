const updateParticipants = (event) => {
  return (dispatch, getState) => {
    const { userData } = getState();

    dispatch({
      type: 'UPDATE_PARTICIPANTS',
      items: userData.items,
      event,
    });
  }
}

const updateItems = (event) => {
  return (dispatch, getState) => {
    const { userData } = getState();

    dispatch({
      type: 'UPDATE_ITEMS',
      participants: userData.participants,
      event,
    });
  }
}

const updateYesNo = (itemId, participant) => {
  return (dispatch, getState) => {
    const { userData } = getState();

    dispatch({
      type: 'UPDATE_YESNO',
      items: userData.items,
      participants: userData.participants,
      itemId,
      participant
    });
  }
}

export {
  updateParticipants,
  updateItems,
  updateYesNo
};
