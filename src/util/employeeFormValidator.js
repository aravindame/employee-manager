import * as Yup from 'yup';

/**
 * A schema object that defines validation rules for a form with fields for first name,
 *  last name, email, and phone number.
 *
 * @author Aravinda Meewalaarachchi
 */

export default Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for First Name')
    .min(6, 'First Name must be at least 6 characters')
    .max(10, 'First Name must not exceed 10 characters'),
  lastName: Yup.string()
    .required('Last Name is required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for Last Name')
    .min(6, 'Last Name must be at least 6 characters')
    .max(10, 'Last Name must not exceed 10 characters'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  number: Yup.string()
    .required('Phone is required')
    .matches(/^(?:[+0]9)?[0-9]{10}$/, 'Please enter valid phone number'),
});
