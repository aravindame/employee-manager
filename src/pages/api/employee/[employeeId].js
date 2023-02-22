import connection from '@/database/connection';
import EmployeeModel from '@/database/Models/employee';
import { schemaValidator } from '@/util/employeeSchemaValidator';
import { safeExecutionHandler } from '@/util/safeExecutionHandler';

/**
 * Handles requests for PUT, DELETE employee API routes.
 *
 * @author Aravinda Meewalaarachchi
 *
 */

//Validates data against a predefined schema.
const validator = schemaValidator();

/**
 *
 * Handles PUT requests to update an employee by ID
 * @function updateEmployeeHandler
 * @async
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @throws {Error} If there is an error with the request body or the employee ID is invalid
 * @returns {Promise} A Promise that resolves when the function has completed executing.
 */

async function updateEmployeeHandler(req, res) {
  const {
    body,
    query: { employeeId },
  } = req;
  // Validate the request body
  const error = validateBeforeAddOrUpdate(body);
  if (error) {
    throw error;
  }

  const employee = await EmployeeModel.findById(employeeId);

  if (!employee) throw new Error('Invalid employee ID.');
  const result = await EmployeeModel.findByIdAndUpdate(employeeId, body, { new: true });
  res.status(201).json({ ...result?._doc });
}
/**
 *
 * Handles DELETE requests to remove an employee by ID
 * @function deleteEmployeeHandler
 * @async
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @throws {Error} If the employee ID is invalid
 * @returns {Promise} A Promise that resolves when the function has completed executing.
 */

async function deleteEmployeeHandler(req, res) {
  const employee = await EmployeeModel.findByIdAndRemove(req?.query?.employeeId);

  if (!employee) throw new Error('Invalid employee ID.');
  res.status(204).json();
}

function validateBeforeAddOrUpdate(body) {
  const { error } = validator(body);
  if (error) return new Error(error.details[0].message);
  return;
}

/**
 * Handles GET and POST requests to /api/employee route
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 * @returns {Promise<void>} - A Promise that resolves when the request has been handled
 */

export default async function handler(req, res) {
  await safeExecutionHandler(connection, req, res, { statusCode: 500 });

  switch (req?.method) {
    case 'PUT': {
      await safeExecutionHandler(updateEmployeeHandler, req, res);
      break;
    }
    case 'DELETE': {
      await safeExecutionHandler(deleteEmployeeHandler, req, res);
      break;
    }
    default: {
      res.status(400).json({ message: 'Bad request!' });
    }
  }
}
