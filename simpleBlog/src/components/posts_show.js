import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions/actions';

class PostsShow extends Component {
  componentDidMount() {
    //we need the id from the url
    //react-router gives us the match.params props
    //params will contain all the wildcards in the url
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }
  onDeleteClick() {
    const { id } = this.props.match.params;
    //we need an action creator that will come in as props
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }
  render() {
    const { post } = this.props;
    if(!post) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Link to="/">Back To Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}
//first arg is app state. ownProps is all the props that are passed to PostsShow
function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] }
}
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
