import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Configure the base URL for HTTP requests
const urlConfig = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
};

/**
 * An async thunk function that fetches all employees from the API.
 * @function fetchAllEmployees
 * @async
 * @param {string} id - The ID of the employee to fetch.
 * @param {Object} options - The options object passed by Redux Toolkit.
 * @param {Function} options.rejectWithValue - The function to reject the promise with a custom value.
 * @returns {Promise<Array>} The array of employees fetched from the API.
 */

export const fetchAllEmployees = createAsyncThunk(
  'employee/fetchAll',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(urlConfig.BASE_URL);
      return response?.data?.employees;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

/**
 * An async thunk function that creates an employee in the API.
 * @function createEmployee
 * @async
 * @param {Object} employee - The object containing the employee's details.
 * @param {Object} options - The options object passed by Redux Toolkit.
 * @param {Function} options.rejectWithValue - The function to reject the promise with a custom value.
 * @returns {Promise<Object>} The employee object returned from the API.
 */

export const createEmployee = createAsyncThunk(
  'employee/create',
  async (employee, { rejectWithValue }) => {
    try {
      const response = await axios.post(urlConfig.BASE_URL, employee);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

/**
 * An async thunk function that updates an employee in the API.
 * @function updateEmployee
 * @async
 * @param {Object} data - The object containing the employee's details to update.
 * @param {string} employeeId - The ID of the employee to update.
 * @param {Object} options - The options object passed by Redux Toolkit.
 * @param {Function} options.rejectWithValue - The function to reject the promise with a custom value.
 * @returns {Promise<Object>} The updated employee object returned from the API.
 */

export const updateEmployee = createAsyncThunk(
  'employee/update',
  async ({ data, employeeId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${urlConfig.BASE_URL}/${employeeId}`, data);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

/**
 * Asynchronous thunk action creator that deletes an employee with the given ID
 * @param {string} employeeId - The ID of the employee to delete
 * @param {object} options - The options object for the thunk action creator
 * @param {function} options.rejectWithValue - The rejectWithValue function from createAsyncThunk, used to handle rejected promises
 * @returns {Promise} A promise that resolves with the deleted employee ID, or rejects with an error object containing response data if the request fails
 */

export const deleteEmployee = createAsyncThunk(
  'employee/delete',
  async (employeeId, { rejectWithValue }) => {
    try {
      await axios.delete(`${urlConfig.BASE_URL}/${employeeId}`);
      return employeeId;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);
