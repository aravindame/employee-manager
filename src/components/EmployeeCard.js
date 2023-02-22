'use client';

import React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import { Avatar, Box, Typography, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { deleteEmployee } from '@/redux/actions/employee.actions';

/**
 * A component that is responsible for rendering a single card in the grid view.
 * @author Aravinda Meewalaarachchi
 */

export default function EmployeeCard({ employee }) {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleEditEmployee = (employee) => {
    //route to the employee edit page
    if (!employee && !employee?._id) return;
    router.push(`/employee/edit/${employee?._id}`);
  };

  return (
    employee && (
      <Grid item lg={12 / 5} xs={2} maxWidth={300} position={'relative'}>
        <Card>
          <Image
            priority={true}
            width={260}
            height={180}
            src={employee?.photo}
            alt='img'
            className='img'
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box padding={2}>
              <Typography variant='text-card-info'>
                {employee?.first_name} {employee?.last_name}
              </Typography>
              <Typography variant='text-card-info' textTransform={'lowercase'}>
                {employee?.email}
              </Typography>
              <Typography variant='text-card-info'>{employee?.number}</Typography>
              <Typography variant='text-card-info'>{employee?.gender}</Typography>
            </Box>
            <Box
              padding={2}
              display={'flex'}
              alignItems={'flex-start'}
              justifyContent={'flex-end'}
              position={'absolute'}
              ml={18}
              mt={6}
            >
              <Tooltip title={'Delete employee'}>
                <Avatar
                  sx={{
                    backgroundColor: theme?.palette?.error.main,
                    m: 0.5,
                    '&:hover': { opacity: 0.8 },
                    cursor: 'pointer',
                  }}
                  // delete employee click handler
                  onClick={() => {
                    dispatch(deleteEmployee(employee?._id));
                  }}
                >
                  <DeleteIcon />
                </Avatar>
              </Tooltip>
              <Tooltip title={'Edit employee'}>
                <Avatar
                  sx={{
                    backgroundColor: theme?.palette?.success?.main,
                    m: 0.5,
                    '&:hover': { opacity: 0.8 },
                    cursor: 'pointer',
                  }}
                  onClick={() => handleEditEmployee(employee)}
                >
                  <EditIcon />
                </Avatar>
              </Tooltip>
            </Box>
          </Box>
        </Card>
      </Grid>
    )
  );
}
