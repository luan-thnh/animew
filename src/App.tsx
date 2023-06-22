import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { appBlack } from 'constants/colors';
import { AppProvider } from 'components/Contexts';
import { Stack } from '@mui/system';
import AppRouter from './router/index';
import theme from 'theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Stack sx={{ bgcolor: appBlack[900] }}>
        <Stack width="1440px" margin="0 auto" px="100px">
          <CssBaseline />
          <AppProvider>
            <AppRouter />
          </AppProvider>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
