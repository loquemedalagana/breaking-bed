import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import routes from 'src/routes/routes';
import MuiTheme from 'src/styles/theme';

const router = createBrowserRouter(routes);

const App: React.FC = () => {
  return (
    <ThemeProvider theme={MuiTheme}>
      {/* TODO: Provider should be here */}
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
