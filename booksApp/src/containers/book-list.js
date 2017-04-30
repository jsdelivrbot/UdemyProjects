import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectBook } from '../actions/actions';

class Booklist extends Component {
  renderList() {
    return (
      this.props.books.map(
        book => {
          return (
            <li
              key={book.title}
              onClick={ () => this.props.selectBook(book) }
              className="list-group-item">{book.title}
            </li>
          );
        }
      )
    );
  }
  render() {
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  //Whatever is returned from here will show up as props in of Booklist.
  return (
    { books: state.books }
  );
}
//Anything returned from this func will end up us as props on the Booklist container
function mapDispatchToProps(dispatch) {
  console.log('mapDispatchToProps()');
  //whenever selectBook is called, the result should be passed to all our reducers.
  return bindActionCreators({selectBook: selectBook}, dispatch)
}

//Promote Booklist to a component to a container - it needs to know about this new dispatch method, selectBook. Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(Booklist);

//connect takes a function and Component and produces a container which is a Component that is aware of the state contained within Redux.
