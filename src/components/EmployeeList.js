'use client';

import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { EmployeeGridView } from '@/components/EmployeeGridView';
import { EmployeeButtonGroup } from '@/components/EmployeeButtonGroup';
import { EmployeeTableView } from '@/components/EmployeeTableView';
import { useSelector } from 'react-redux';

/**
 * A main container component which renders the list or grid view representation according to the side effects.
 * @author Aravinda Meewalaarachchi
 */

export default function EmployeeList() {
  const { employees: data } = useSelector((state) => state?.employees);
  const [employees, setEmployees] = useState([]);
  // switch to change the grid or list view
  const [gridView, setGridView] = useState(false);

  useEffect(() => {
    if (data && data.length !== 0) {
      setEmployees(data);
    }
  }, [data, gridView]);

  return (
    <React.Fragment>
      <CssBaseline />
      <EmployeeButtonGroup gridView={gridView} setGridView={setGridView} />
      <Container maxWidth='xl' sx={{ my: 8 }}>
        {gridView ? (
          <EmployeeGridView employees={employees} />
        ) : (
          <EmployeeTableView employees={employees} />
        )}
      </Container>
    </React.Fragment>
  );
}
