import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import { Avatar, Box, Button, Typography, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { deleteEmployee } from '@/redux/actions/employee.actions';

/**
 * The component that is responsible for rendering the employee table.
 * @author Aravinda Meewalaarachchi
 */

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.tableCellHead.background,
    color: theme.palette.common.white,
    border: 'solid',
    borderColor: theme.palette.tableCellHead.boarder,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: 'solid',
    borderColor: theme.palette.tableCellHead.boarder,
  },
}));

export function EmployeeTableView({ employees }) {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 1600 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Typography variant='table-data'>Image</Typography>
            </StyledTableCell>
            <StyledTableCell align='left'>
              <Typography variant='table-data'>First Name</Typography>
            </StyledTableCell>
            <StyledTableCell align='left'>
              <Typography variant='table-data'>Last Name</Typography>
            </StyledTableCell>
            <StyledTableCell align='left'>
              <Typography variant='table-data'>Email</Typography>
            </StyledTableCell>
            <StyledTableCell align='left'>
              <Typography variant='table-data'>Phone</Typography>
            </StyledTableCell>
            <StyledTableCell align='left'>
              <Typography variant='table-data'>Gender</Typography>
            </StyledTableCell>
            <StyledTableCell align='left'>
              <Typography variant='table-data'>Actions</Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees?.map((row) => (
            <TableRow key={row._id}>
              <StyledTableCell align='center' width={80} height={80}>
                <Image src={row.photo} alt={`${row.name_img}`} width={60} height={60} />
              </StyledTableCell>
              <StyledTableCell component='th' scope='row' align='left'>
                <Typography variant='table-data'>{row.first_name}</Typography>
              </StyledTableCell>
              <StyledTableCell component='th' scope='row' align='left'>
                <Typography variant='table-data'>{row.last_name}</Typography>
              </StyledTableCell>
              <StyledTableCell align='left'>
                <Typography variant='table-data' textTransform={'lowercase'}>
                  {row.email}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align='left'>
                <Typography variant='table-data'>{row.number}</Typography>
              </StyledTableCell>
              <StyledTableCell align='left'>
                <Typography variant='table-data'>{row.gender}</Typography>
              </StyledTableCell>
              <StyledTableCell align='left'>
                <Typography variant='table-data'>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Button
                      variant='contained'
                      sx={{
                        borderRadius: 1,
                        p: 1,
                        backgroundColor: theme?.palette?.tableCellHead?.button,
                        '&:hover': {
                          backgroundColor: theme?.palette?.tableCellHead?.button,
                          opacity: 7,
                        },
                      }}
                      //route to the employee edit page
                      onClick={() => router.push(`/employee/edit/${row._id}`)}
                    >
                      Edit
                    </Button>
                    <Avatar
                      sx={{
                        backgroundColor: theme?.palette?.common?.white,
                        color: theme?.palette?.primary?.error,
                        m: 2,
                        '&:hover': {
                          backgroundColor: theme?.palette?.secondary?.btnBackground,
                          boxShadow: 10,
                          cursor: 'pointer',
                        },
                      }}
                      // delete the selected employee
                      onClick={() => dispatch(deleteEmployee(row._id))}
                    >
                      <DeleteIcon sx={{ fontSize: 48 }} />
                    </Avatar>
                  </Box>
                </Typography>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
