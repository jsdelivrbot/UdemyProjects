export function selectBook(book) {
  console.log('selectBook()');
  //select Book is an action creator that needs to return an action.
  //an object with an type property
  return {
    type: 'BOOK_SELECTOR',
    payload: book
  };
}
