import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { createPost } from '../actions/actions';

//reduxForm is the equivalent of connect() from react-redux. It connects the form: formReducer in the reducers file. It connects it to the state in redux.
function Input(props) {
  console.log(props);
  if(props.type === 'textarea') {
    return (
      <textarea
        cols="30"
        rows="10"
        className="form-control"
        {...props.field.input}
      />
    );
  }
  else {
    return (
      <input type="text"
        className="form-control"
        {...props.field.input}
      />
    )
  }
}
class PostsNew extends Component {
  /*
  {...field.input} is the equivalent of
    onChange={field.input.onChange}
    onFocus={field.input.onFocus}
  */
  renderInputField(field) {
    const { meta: { touched, error } } = field;//destructuring
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <Input
          type={field.type}
          field={field}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    //this === component

    //we have to wait until the post is created because if we navigate the user back immediately, the post they created may not show up on the postsIndex.

    //call an action creator
    this.props.createPost(values, ()=> {
      this.props.history.push('/');
    });
  }
  render() {
    const { handleSubmit } = this.props;
    /*
    handleSubmit() is being passed to props on behalf of reduxForm()
    handleSubmit() handles form validation (and other things redux-form does for us), but we still have to handle saving the data to the backend. To do this we pass handleSubmit() a function that we define.
    */
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          type="text"
          /* component prop needs a function that returns JSX */
          component={this.renderInputField}
        />
        <Field
          label="Categories"
          name="categories"
          type="text"
          component={this.renderInputField}
        />
        <Field
          label="Content"
          name="content"
          type="textarea"
          component={this.renderInputField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  //values is an obj that contains all the values the user has entered into the form.
  /*
  Validation:
    Three states of form inputs:
      1. pristine = when the form first renders and the user has done nothing.
      2. touched = the user has partially or fully entered in some information and then moved away. Focused and Focused away.
      3. invalid = after form is checked and deemed invalid based on the parameters set by us.
  */
  const errors = {};
  //validate the inputs from 'values'
  if(!values.title) {
    errors.title = "Enter a title!";
  }
  if(!values.categories) {
    errors.categories = "Enter some categories."
  }
  if(!values.content) {
    errors.content = "Enter some content"
  }

  //if we return an empty errors obj, the form is fine to submit. But if there are any props, redux-form assumes form is invalid.
  return errors;
}

//instead of mapStateToProps and mapDispatchToProps like in connect, you pass an config obj to reduxForm.
export default reduxForm({
  form: 'PostsNewForm',
  validate
})
(
  connect(null, { createPost })(PostsNew)
  //the connect() return a component, which is passed reduxForm();
);
