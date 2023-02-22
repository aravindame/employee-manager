'use client';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

/**
 * A Component that will responsible for rendering the header of the page
 *
 * @author Aravinda Meewalaarachchi
 *
 */

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='primary'>
        <Toolbar variant='dense'>
          <Typography variant='body1' color='inherit' component='div'>
            Employee Manager
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
