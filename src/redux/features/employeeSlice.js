import { createSlice } from '@reduxjs/toolkit';
import {
  createEmployee,
  deleteEmployee,
  fetchAllEmployees,
  updateEmployee,
} from '@/redux/actions/employee.actions';
import {
  createEmployeeFulfilledReducer,
  deleteEmployeeFulfilledReducer,
  fetchAllEmployeesFulfilledReducer,
  pendingReducer,
  rejectedReducer,
  updateEmployeeFulfilledReducer,
} from '@/redux/reducers/employee.reducers';

//Initial State for the employee slice
const initialState = {
  employees: [],
  employee: null,
  loading: null,
  status: null,
  error: null,
};

/**

* A Redux toolkit slice that defines the "employee" state, including its initial state, reducers, and extra reducers.
* @author Aravinda Meewalaarachchi
* @typedef {Object} EmployeeSlice
* @property {string} name - The name of the slice, used as a prefix for generated action types
* @property {Object} initialState - The initial state of the slice, which includes an empty array of employees, a null 
*                                    employee object, a null loading flag, a null status flag, and a null error object
* @property {Object} reducers - The reducers for the slice, including "findEmployeeById" and "clearEmployee"
* @property {Object} extraReducers - The extra reducers for the slice, which handle the pending, fulfilled, and rejected states 
                                   of the async actions defined in "employee.actions"
**/

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    findEmployeeById(state, action) {
      const result = state?.employees?.filter((item) => {
        return item?._id === action?.payload;
      });
      return { ...state, employee: result[0] };
    },
    clearEmployee(state) {
      return { ...state, employee: null };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllEmployees.pending, pendingReducer);
    builder.addCase(createEmployee.pending, pendingReducer);
    builder.addCase(updateEmployee.pending, pendingReducer);
    builder.addCase(deleteEmployee.pending, pendingReducer);

    builder.addCase(fetchAllEmployees.fulfilled, fetchAllEmployeesFulfilledReducer);
    builder.addCase(createEmployee.fulfilled, createEmployeeFulfilledReducer);
    builder.addCase(updateEmployee.fulfilled, updateEmployeeFulfilledReducer);
    builder.addCase(deleteEmployee.fulfilled, deleteEmployeeFulfilledReducer);

    builder.addCase(fetchAllEmployees.rejected, rejectedReducer);
    builder.addCase(createEmployee.rejected, rejectedReducer);
    builder.addCase(updateEmployee.rejected, rejectedReducer);
    builder.addCase(deleteEmployee.rejected, rejectedReducer);
  },
});

export const { findEmployeeById, clearEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
