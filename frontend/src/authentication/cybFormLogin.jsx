import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { authenticateUser, hideLogin } from './cybAuthActionCreators';
import styles from './formStyle.styl';

const renderInput = field => (
  <div>
    <input {...field.input} type={field.type} label={field.label} />
    {field.meta.touched &&
    field.meta.error &&
    <span className="error" >{field.meta.error}</span>}
  </div>
);

let dispatch;
const formContainerClass = 'container login';
const formClass = `${formContainerClass} form`;
const toolbarClass = `${formContainerClass} toolbar`;
const triggerLogin = (values) => {
  dispatch(authenticateUser(values));
  dispatch(hideLogin());
};

const loginForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  dispatch = props.dispatch;
  return (
    <div className={styles.body} >
      <div className={toolbarClass} >
        <div >
          <p>Pick your handle Cowboy!</p>
        </div>
      </div>
      <form className={formClass} onSubmit={handleSubmit(triggerLogin)} >
        <div>
          <Field name="username" component={renderInput} type="text" label="username" />
        </div>
        <div>
          <Field name="password" component={renderInput} type="password" label="password" />
        </div>
        <div>
          <button
            className={styles.button}
            type="submit"
            disabled={pristine || submitting}
            style={{ margin: 12 }}
          >Submit
          </button>
          <button
            className={styles.button}
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
            style={{ margin: 12 }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

loginForm.propTypes = {
  dispatch: PropTypes.func,
  reset: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
};

const LoginForm = reduxForm({
  form: 'loginForm',
})(loginForm);

export default LoginForm;
