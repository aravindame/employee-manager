'use client';

import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Paper,
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  CssBaseline,
  Container,
  Select,
  MenuItem,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import validationSchema from '@/util/employeeFormValidator';
import { useDispatch, useSelector } from 'react-redux';

import { camelToSnakeCase } from '@/util/camelToSnakeCase';
import { clearEmployee, findEmployeeById } from '@/redux/features/employeeSlice';
import { createEmployee, updateEmployee } from '@/redux/actions/employee.actions';

/**
 * A component that is responsible for rendering the employee add or edit forms.
 * @author Aravinda Meewalaarachchi
 */

export const EmployeeForm = ({ employeeId }) => {
  // default profile picture when employee photo is not present in payload
  const avatarImg = process.env.AVATAR || '';

  //helper fields to generate the employee form fields dynamically
  const fields = useMemo(
    () => ({
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      number: 'Phone',
    }),
    [],
  );
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  //Yup validator initialization
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { employee } = useSelector((state) => state.employees);
  const [gender, setGender] = useState('Male');

  // fetch the employee by employeeID from store if it is a employee edit route.
  useEffect(() => {
    employeeId && dispatch(findEmployeeById(employeeId));
  }, [dispatch, employeeId]);

  // populate the retrieved data from the store if it is a employee edit route.
  useEffect(() => {
    employee &&
      Object.keys(fields).forEach((item) => {
        setValue(item, employee[camelToSnakeCase(item)]);
      });
  }, [employee, fields, setValue]);

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const onSubmit = (_data) => {
    const data = { ..._data };
    normalizePayload(data, gender, employee, avatarImg);
    // short circuit logic to check the route is add or edit page
    employeeId ? dispatch(updateEmployee({ data, employeeId })) : dispatch(createEmployee(data));
  };

  //Normalize the payload to accommodate the use of snake case, which is currently supported by React Hook Forms.
  const normalizePayload = (data, gender, employee, avatarImg) => {
    data['gender'] = gender?.charAt(0).toUpperCase();
    if (data['photo'] === undefined) {
      data['photo'] = employee ? employee?.photo : avatarImg;
    }
    data['first_name'] = data['firstName'];
    data['last_name'] = data['lastName'];
    delete data.firstName;
    delete data.lastName;
  };

  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth='sm' sx={{ my: 8 }}>
        <Box display={'flex'} justifyContent='end'>
          <Button
            onClick={() => {
              dispatch(clearEmployee());
              router.push('/employee/list');
            }}
            variant='contained'
            sx={{ px: 6, my: 4, borderRadius: 6, fontWeight: 'bold' }}
          >
            List View
          </Button>
        </Box>
        <Paper sx={{ borderRadius: 4, border: 'groove #E7E9EB' }}>
          <Box px={4} py={2} my={2}>
            <Grid container spacing={1} justifyContent='center'>
              {Object.keys(fields)?.map((field) => {
                return (
                  <Grid key={field} item xs={12} display='block'>
                    <Box display={'flex'} alignItems='center'>
                      <Typography variant='customForm' width={120}>
                        {fields[`${field}`]}
                      </Typography>
                      <TextField
                        required
                        id={field}
                        name={field}
                        fullWidth
                        margin='dense'
                        {...register(field)}
                        error={errors[`${field}`] ? true : false}
                      />
                    </Box>
                    <Typography variant='inherit' color='textSecondary'>
                      {errors[`${field}`]?.message}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
            <Grid item xs={12} display='block' mt={2}>
              <Box display={'flex'} alignItems='center'>
                <Typography id='gender' width={120} variant='inherit'>
                  Gender
                </Typography>
                <Select
                  labelId='gender'
                  id='gender'
                  fullWidth
                  value={gender || ''}
                  onChange={handleChange}
                >
                  <MenuItem value='Male'>Male</MenuItem>
                  <MenuItem value='Female'>Female</MenuItem>
                </Select>
              </Box>
            </Grid>

            <Box mt={3} display='flex' justifyContent='flex-end'>
              <Button
                sx={{
                  backgroundColor: 'white',
                  border: `solid ${theme?.palette?.primary?.main}`,
                  fontWeight: 'bold',
                  color: `${theme?.palette?.primary?.main}`,
                  px: 5,
                  borderRadius: 2,
                  borderWidth: 'thin',
                }}
                onClick={handleSubmit(onSubmit)}
              >
                {employeeId ? 'Save' : 'Add'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Fragment>
  );
};
