import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//BrowserRouter interacts with history library. Looks at entire url
import promise from 'redux-promise';

import reducers from './reducers/reducers';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

/*
  React Router acts unexpectedly when choosing which components to display. It will display both PostsIndex and PostsNew at the url /posts/new. To just show PostNew, you use a Switch component which will render the first component that matches the current url. Therefore you want to put the most specific paths at the top of the list
  Switch will render its children
  */
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostsNew} />
          {/* React-router passes in a whole bunch of props to a component that can be used for programatic navigation. */}
          <Route path="/posts/:id" component={PostsShow} />
          {/* the Posts Show component has to be the second route. If it was first, posts/new would be seen as the wildcard token.*/}
          <Route path="/" component={PostsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
