const updateParticipants = (event) => (
  {
    type: 'UPDATE_PARTICIPANTS',
    payload: { event }
  }
);

const updateItems = (event) => (
  {
    type: 'UPDATE_ITEMS',
    payload: { event }
  }
);

export {
  updateParticipants,
  updateItems
};
