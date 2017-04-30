import _ from 'lodash';

import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions/actions';

export default function (state = {}, action) {
  switch (action.type) {
    case DELETE_POST:
      //we we return a new local state object without the deleted post. Without this we rely on the re-fetching the entire list of posts from the server after re-directing the user to the postsIndex. This re-fetch updates the aplication-wide state.
      return _.omit(state, action.payload);
    case FETCH_POST:
    //we don't want to throw away all the other posts we've already fetched, so we want to add to state, rather than replace it. So first decontruct the existing state with ...state.
      //ES% way:
      // const post = action.payload.data;
      // const newState = { ...state };
      // newState[post.id] = post;
      // return newState;

      //[action.payload.data.id] -- key interpolation. Use action.payload.data.id as the key. action.payload.data as the value of the object.
      //ES6 way:
      return { ...state, [action.payload.data.id]: action.payload.data };

    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');

    default:
      return state;

  }
}
