import { configureStore } from '@reduxjs/toolkit';
import employeeSliceReducer from './features/employeeSlice';

/**
 * Define a Redux store by calling `configureStore` with an object
 * containing the root reducer for the store.
 * @author Aravinda Meewalaarachchi
 * @returns {Object} The Redux store object.
 */

export const store = configureStore({
  reducer: { employees: employeeSliceReducer },
});
