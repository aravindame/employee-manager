// Define an object containing strings representing the possible states for an API request
const statusTypes = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

/**
 * Reducer function for when an API request is pending
 * @function
 * @name pendingReducer
 * @param {object} state - The current state of the Redux store
 * @returns {object} - A new state object with the status set to "pending" and loading set to true
 */
export const pendingReducer = (state) => {
  return { ...state, status: statusTypes.PENDING, loading: true };
};

/**
 * Reducer function for when an API request to fetch all employees is fulfilled
 * @function
 * @name fetchAllEmployeesFulfilledReducer
 * @param {object} state - The current state of the Redux store
 * @param {object} action - The Redux action object that triggered this reducer function
 * @returns {object} - A new state object with the status set to "fulfilled", loading set to false, and employees set to the data from the API response
 */
export const fetchAllEmployeesFulfilledReducer = (state, action) => {
  return {
    ...state,
    status: statusTypes.FULFILLED,
    loading: false,
    employees: action.payload,
  };
};

/**
 * Reducer function for when an API request to create an employee is fulfilled
 * @function
 * @name createEmployeeFulfilledReducer
 * @param {object} state - The current state of the Redux store
 * @param {object} action - The Redux action object that triggered this reducer function
 * @returns {object} - A new state object with the status set to "fulfilled", loading set to false, and employees set to a new array that includes the newly created employee
 */
export const createEmployeeFulfilledReducer = (state, action) => {
  return {
    ...state,
    status: statusTypes.FULFILLED,
    loading: false,
    employees: [...state.employees, action?.payload],
  };
};

/**
 * Reducer function for when an API request to update an employee is fulfilled
 * @function
 * @name updateEmployeeFulfilledReducer
 * @param {object} state - The current state of the Redux store
 * @param {object} action - The Redux action object that triggered this reducer function
 * @returns {object} - A new state object with the status set to "fulfilled", loading set to false, employee set to null (since we're not editing any employee in particular), and employees set to a new array that includes the updated employee and excludes the previous version of that employee
 */
export const updateEmployeeFulfilledReducer = (state, action) => {
  return {
    ...state,
    status: statusTypes.FULFILLED,
    loading: false,
    employee: null,
    employees: [
      ...state.employees.filter((item) => {
        return item._id !== action?.payload?._id;
      }),
      action?.payload,
    ],
  };
};

/**
 * Reducer function for when an API request to delete an employee is fulfilled.
 *
 * @param {Object} state - The current state.
 * @param {Object} action - The action object containing the payload with the deleted employee's ID.
 * @returns {Object} The new state with the employee removed from the list.
 */
export const deleteEmployeeFulfilledReducer = (state, action) => {
  console.log(action, 'deleteEMp');
  return {
    ...state,
    status: statusTypes.FULFILLED,
    loading: false,
    employee: null,
    employees: [
      ...state.employees.filter((item) => {
        return item._id !== action?.payload;
      }),
    ],
  };
};

/**
 * Reducer function for when an API request is rejected.
 *
 * @param {Object} state - The current state.
 * @param {Object} action - The action object containing the error message.
 * @returns {Object} The new state with the error and the status set to 'rejected'.
 */
export const rejectedReducer = (state, action) => {
  return {
    ...state,
    error: action.payload,
    status: statusTypes.REJECTED,
    loading: false,
  };
};
