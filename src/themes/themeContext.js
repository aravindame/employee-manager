'use client';

const { createTheme, ThemeProvider } = require('@mui/material/styles');

const theme = createTheme({
  palette: {
    primary: {
      main: '#5b00d1',
      error: '#ef5350',
      success: '#4caf50',
    },
    secondary: {
      main: '#4801A3',
      btnBackground: '#f2f4f2',
    },
    tableCellHead: {
      background: '#8DB255',
      boarder: '#729143',
      button: '#486e25',
    },
  },
  spacing: 8,
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#f2f4f2',
          borderBottom: '2px solid #a6b2a9',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: { backgroundColor: '#f2f4f2' },
      },
    },
    MuiAvatar: {
      variants: [
        {
          props: {
            variant: 'rounded',
          },
          style: {
            fontSize: 8,
            display: 'block',
            fontWeight: 'bold',
          },
        },
      ],
    },
    MuiTypography: {
      variants: [
        {
          props: {
            variant: 'text-card-info',
          },
          style: {
            fontSize: 12,
            display: 'block',
            fontWeight: 'bold',
          },
        },
        {
          props: {
            variant: 'body1',
          },
          style: {
            fontSize: 24,
            fontWeight: 600,
          },
        },
        {
          props: {
            variant: 'body2',
          },
          style: {
            fontSize: 16,
          },
        },
        {
          props: {
            variant: 'body3',
          },
          style: {
            fontSize: 8,
          },
        },
        {
          props: {
            variant: 'table-data',
          },
          style: {
            fontSize: 18,
            fontWeight: 'bold',
          },
        },
      ],
    },
  },
});

export const ThemeProviderWrapper = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
