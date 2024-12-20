 // ~src/reducers/counterReducer.js

// initialState là Reducer State
export const initialState = { count: 0 };

// reducer là Reducer Function
export function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: action.payload };
    default:
      throw new Error('Unhandled action type');
  }
}

