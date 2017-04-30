//state argument is not application state, on the state this reducer is responsible for.
export default function(state = null, action) {
  console.log('in reducer-acitve-book');
  console.log(action);
  switch (action.type) {
    case 'BOOK_SELECTOR':
      return action.payload;
  }
  return state
}
//when a user clicks a book, this reducer is sent the selected book and the action type. The swtich statement runs. It returns the correct object. Where does it go from here?
