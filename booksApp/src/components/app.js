import React, { Component } from 'react';

import Booklist from '../containers/book-list';
import BookDetail from '../containers/book-detail';

class App extends Component {
  render() {
    return (
      <div>
        <Booklist />
        <BookDetail />
      </div>
    );
  }
}
export default App;
