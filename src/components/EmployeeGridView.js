'use client';

import React from 'react';
import Grid from '@mui/material/Grid';
import EmployeeCard from './EmployeeCard';

/**
 * A component that is responsible for rendering the employee grid view.
 * @author Aravinda Meewalaarachchi
 */

export function EmployeeGridView({ employees }) {
  return (
    <Grid container spacing={6} justifyContent='flex-start' alignItems='flex-start'>
      {employees &&
        employees?.map((employee) => {
          return <EmployeeCard key={employee?._id} employee={employee} />;
        })}
      <EmployeeCard />
    </Grid>
  );
}
