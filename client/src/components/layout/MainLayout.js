import React, { Fragment } from 'react';

import Navbar from './Navbar';

const MainLayout = ({ children }) => {
  return (
    <Fragment>
      <Navbar />
      {children}
    </Fragment>
  );
};

export default MainLayout;
