import React from 'react';
import ListIcon from '@mui/icons-material/List';
import AppsIcon from '@mui/icons-material/Apps';
import { Avatar, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';

/**
 *  A Component that will responsible for rendering the button group which will
 *  appear in EmployeeList Component
 *  @author Aravinda Meewalaarachchi
 *
 */

export function EmployeeButtonGroup({ gridView, setGridView }) {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', m: 4 }}>
      <Button
        variant='contained'
        sx={{ borderRadius: 6, px: 1.5, py: 1, textTransform: 'uppercase' }}
        onClick={() => router.push('/employee/add')}
      >
        Add Employee
      </Button>
      <Avatar
        sx={{
          backgroundColor: theme?.palette?.primary?.main,
          m: 2,
          '&:hover': { backgroundColor: theme?.palette?.secondary?.main, cursor: 'pointer' },
        }}
        //switch that change the appearance list or grid view
        onClick={() => setGridView((prev) => !prev)}
      >
        {gridView ? <ListIcon sx={{ fontSize: 28 }} /> : <AppsIcon sx={{ fontSize: 28 }} />}
      </Avatar>
    </Box>
  );
}
