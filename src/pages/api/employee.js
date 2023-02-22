import connection from '@/database/connection';
import EmployeeModel from '@/database/Models/employee';
import { schemaValidator } from '@/util/employeeSchemaValidator';
import { safeExecutionHandler } from '@/util/safeExecutionHandler';

/**
 * Handles requests for GET, POST employee API routes.
 *
 * @author Aravinda Meewalaarachchi
 *
 */

const validator = schemaValidator();

/**
 * Handles requests to list all employees.
 *
 * @async
 * @function listAllEmployeeHandler
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 * @returns {Promise} A Promise that resolves when the function has completed executing.
 */
async function listAllEmployeeHandler(req, res) {
  const employees = await EmployeeModel.find({});
  res.status(200).json({ employees });
}

/**
 * Handles requests to add a new employee.
 *
 * @async
 * @function addEmployeeHandler
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 * @returns {Promise} A Promise that resolves when the function has completed executing.
 */
async function addEmployeeHandler({ body }, res) {
  const error = validateBeforeAddOrUpdate(body);
  if (error) {
    throw error;
  }

  const employees = await EmployeeModel.create(body);
  res.status(201).json({ ...employees?._doc });
}

/**
 * Validates an employee object before it is added or updated.
 *
 * @function validateBeforeAddOrUpdate
 * @param {Object} body - The employee object to validate.
 * @returns {Error|undefined} An Error object if the employee object is invalid, undefined otherwise.
 */
function validateBeforeAddOrUpdate(body) {
  const { error } = validator(body);
  if (error) return new Error(error.details[0].message);
  return;
}

/**
 * Handles incoming requests for the employee API.
 *
 * @async
 * @function handler
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 * @returns {Promise} A Promise that resolves when the function has completed executing.
 */
export default async function handler(req, res) {
  // Make sure that the database connection is safe to use before handling the request.
  await safeExecutionHandler(connection, req, res, { statusCode: 500 });

  // Handle the request based on the HTTP method.
  switch (req?.method) {
    case 'GET': {
      await safeExecutionHandler(listAllEmployeeHandler, req, res);
      break;
    }
    case 'POST': {
      await safeExecutionHandler(addEmployeeHandler, req, res);
      break;
    }
    default: {
      res.status(400).json({ message: 'Bad Request!' });
    }
  }
}
