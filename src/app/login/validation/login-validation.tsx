import * as Yup from "yup";

// Validation error messages
export const ERRORS = {
  EMAIL: 'Email format is not valid.',
  TOO_SHORT_CHAR_ERROR: (min: number) => `Please provide a minimum of ${min} characters`,
  REQUIRED: (name: string) => `${name} field is required.`,
};

// Validation for login form
export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
  .required(ERRORS.REQUIRED('Email'))
  .email(ERRORS.EMAIL),
  password: Yup.string()
    .required(ERRORS.REQUIRED('Password'))
    .min(6, ERRORS.TOO_SHORT_CHAR_ERROR(6))
});