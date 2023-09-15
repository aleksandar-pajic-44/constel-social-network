// React Core
import { Form } from 'react-bootstrap';

// Third-party libraries
import * as formik from 'formik';
import { Alert, Button } from 'react-bootstrap';

// Validation
import { loginValidationSchema } from '../validation/login-validation';

// Models
import { LoginCredentials } from '../models/login';

const LoginForm = ({ errorMessage, onFormSubmit }: { errorMessage?: string, onFormSubmit: Function }) => {
  const { Formik } = formik;

  const onSubmit: Function = (formValue: LoginCredentials) => {
    onFormSubmit(formValue);
  }

  return (
    <Formik
      validationSchema={loginValidationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(formValue: LoginCredentials) => {onSubmit(formValue)}}
      initialValues={{
        email: '',
        password: ''
      }}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <Form className='login__form' id='login-form' noValidate onSubmit={handleSubmit} >
          {/* Email input */}
          <Form.Group className='form-group' controlId="email">
            <Form.Label className='fw-bold'>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email here..."
              name="email"
              aria-describedby="emailHelp"
              value={values.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />

            {/* Validation message */}
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password input */}
          <Form.Group className='form-group' controlId="password">
            <Form.Label className='fw-bold'>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password here..."
              name="password"
              aria-describedby="passwordHelp"
              value={values.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />

            {/* Validation message */}
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          {errorMessage && (
            <Alert className='login__errorMessage' variant='danger'>
              {errorMessage}
            </Alert>
          )}

          {/* Submit button */}
          <div className='login__submitButton__wrapper'>
            <Button className='login__submitButton' id='login-submit' type='submit' variant='secondary'>Confirm</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;