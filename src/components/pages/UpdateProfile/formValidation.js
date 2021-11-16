import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup
    .string()
    .required('username required')
    .min(3, 'username must be at least 3 characters long'),
  firstName: yup
    .string()
    .required('first name required')
    .min(2, 'first name must be at least 2 characters long'),
  lastName: yup
    .string()
    .required('last name required')
    .min(2, 'last name must be at least 2 characters long'),
  email: yup
    .string()
    .email('you must provide a valid email')
    .required('email required'),
  role: yup
    .number()
    .required('please select a role')
    .max(5),
});

export default schema;
