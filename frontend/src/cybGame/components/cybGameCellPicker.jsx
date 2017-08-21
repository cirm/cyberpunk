import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, reset } from 'redux-form/immutable';
import { pickCell } from '../cybGameActionCreators';
import styles from './cybGameCellPicker.styl';

let dispatch;
let display;

const logField = (input) => {
  const data = {
    decker: display,
    cell: input.get('cell'),
  };
  dispatch(pickCell(data));
  dispatch(reset('CellPickerForm'));
};

const renderInput = field => ( // Define stateless component to render input and errors
  <div className={styles.formStyle}>
    <input className={styles.formStyle} {...field.input} type={field.type} />
    {
      field.meta.touched &&
      field.meta.error &&
      <span className="error"> {field.meta.error} </span>
    }
  </div>);

const chatForm = (props) => {
  const { handleSubmit, pristine, submitting } = props;
  dispatch = props.dispatch;
  display = props.display || 'skiddle';
  return (
    <form className={styles.formStyle} onSubmit={handleSubmit(logField)}>
      <div className={styles.inputStyle}>
        <Field name="cell" type="text" label="game" component={renderInput} />
      </div>
      <div className={styles.buttonStyle}>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
      </div>
    </form>
  );
};

chatForm.propTypes = {
  handleSubmit: PropTypes.func,
  dispatch: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  display: PropTypes.string,
};

export default reduxForm({
  form: 'CellPickerForm',
})(chatForm);
