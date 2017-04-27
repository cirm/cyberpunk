import React, { PropTypes } from 'react';
import { Field, reduxForm, reset } from 'redux-form/immutable';
import { sendMessage } from './cybActionCreators';
import styles from './cybChatInput.styl'

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

const renderInput = field => (  // Define stateless component to render input and errors
  <div className={styles.formStyle}  >
    <input className={styles.formStyle} {...field.input} autoFocus type={field.type} />
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
    <form className={styles.formStyle}  onSubmit={handleSubmit(logField)} >
      <div className={styles.inputStyle} >
        <Field name="text" type="text" label="chat" component={renderInput} />
      </div>
      <div className={styles.buttonStyle} >
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
