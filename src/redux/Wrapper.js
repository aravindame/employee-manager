'use client';

import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import { fetchAllEmployees } from './actions/employee.actions';

/**
 * A wrapper component is used to provide the Redux store, which was necessary to
 * eliminate the integration issue between Redux and Next.js 13. This solution
 * can be considered a hack.
 *
 *
 * @author Aravinda Meewalaarachchi
 * @param {Object} props - The props for this component.
 * @param {Object} props.children - The child components to be wrapped.
 * @returns {Object} - The wrapped child components with access to the Redux store.
 * @see https://github.com/vercel/next.js/issues/41994#issuecomment-1308810315
 */

export const Wrapper = ({ children }) => {
  store.dispatch(fetchAllEmployees());

  return <Provider store={store}>{children}</Provider>;
};
