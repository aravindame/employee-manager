import Joi from 'joi';

/**
 * Validates data against a predefined schema.
 *
 * @author Aravinda Meewalaarachchi
 * @returns {function} A function that takes in data and returns a Joi validation result.
 */

export function schemaValidator() {
  const schema = Joi.object({
    first_name: Joi.string()
      .required()
      .label('First Name is required.')
      .regex(/^[aA-zZ\s]+$/)
      .label('Only allow alphabets.')
      .min(6)
      .label('Minimum length should be 6.')
      .max(10)
      .label('Maximum length should be 10.'),
    last_name: Joi.string()
      .required()
      .label('First Name is required.')
      .regex(/^[aA-zZ\s]+$/)
      .label('Only allow alphabets.')
      .min(6)
      .label('Minimum length should be 6.')
      .max(10)
      .label('Maximum length should be 10.'),
    email: Joi.string().required().email().label('Please enter valid email.'),
    number: Joi.string()
      .required()
      .regex(/^(?:[+0]9)?[0-9]{10}$/)
      .label('Phone number is in invalid format or length is less than 10.'),
    gender: Joi.string().valid('M', 'F').required().label('Values should be "M" or "F".'),
    photo: Joi.string().required().label('Photo field is required.'),
  });

  return function (data) {
    return schema.validate(data);
  };
}
