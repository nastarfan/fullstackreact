let state = {
  isFetchingContacts: true,
  isFetchingUser: true,
  contacts: [],
  user: {},
  error: false, // will always be false with the new data flow used?
};

const listeners = [];

export default {
  getState() {
    return state;
  },
  setState(newState) {
    state = { ...state, ...newState };
    listeners.forEach(listener => listener());
  },
  onChange(newListener) {
    listeners.push(newListener); // add the new listener to the array
    return () => listeners.filter(listener => listener !== newListener);
  },
};
