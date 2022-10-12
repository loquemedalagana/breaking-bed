import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import routes from 'src/routes/routes';
import BreakingBedProvider from 'src/stores/BreakingBedProvider';
import MuiTheme from 'src/styles/theme';

const router = createBrowserRouter(routes);

const App: React.FC = () => {
  return (
    <ThemeProvider theme={MuiTheme}>
      <BreakingBedProvider>
        <RouterProvider router={router} />
      </BreakingBedProvider>
    </ThemeProvider>
  );
};

export default App;
