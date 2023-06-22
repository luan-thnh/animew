export const VALIDATE = {
  MINIMUM_NAME_LENGTH: 3,
  MINIMUM_PASSWORD_LENGTH: 8,
  EMAIL_VALIDATION_REGEX: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  PASSWORD_VALIDATION_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
};

export const MESSAGES = {
  INVALID_EMAIL: 'Email must be a valid email address!',
  USERNAME_REQUIRED: 'Username must be required!',
  EMAIL_REQUIRED: 'Email must be required!',
  PASSWORD_REQUIRED: 'Password must be required!',
  INVALID_PASSWORD:
    'Password must contain at least one lowercase letter, one uppercase letter, and one number!',
  CONFIRM_PASSWORD_REQUIRED: 'Confirm Password must be required!',
  PASSWORDS_NOT_MATCHING: 'Passwords must match!',
};
