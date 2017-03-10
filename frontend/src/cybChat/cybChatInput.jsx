import React, { PropTypes } from 'react';

import { Field, reduxForm, reset } from 'redux-form/immutable';
import { sendMessage } from './cybActionCreators';

let dispatch;
let display;

const logField = (input) => {
  const data = {
    decker: display,
    text: input.get('text'),
  };
  dispatch(sendMessage(data));
  dispatch(reset('ChatForm'));
};

const inputStyle = {
  width: '80px',
  float: 'left',
  marginLeft: '1.5em',
};

const buttonStyle = {
  marginLeft: '1.5em',
};

const renderInput = field => (  // Define stateless component to render input and errors
  <div>
    <input {...field.input} autoFocus type={field.type} />
    {
      field.meta.touched &&
      field.meta.error &&
      <span className="error" > {field.meta.error} </span>
    }
  </div>);

const chatForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  dispatch = props.dispatch;
  display = props.display || 'skiddle';
  return (
    <form onSubmit={handleSubmit(logField)} >
      <div style={inputStyle} >
        <Field name="text" type="text" label="chat" component={renderInput} />
      </div>
      <div style={buttonStyle} >
        <button type="submit" disabled={pristine || submitting} >Submit</button>
      </div>
    </form>
  );
};

chatForm.propTypes = {
  handleSubmit: PropTypes.func,
  dispatch: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
};

export default reduxForm({
  form: 'ChatForm',
})(chatForm);
