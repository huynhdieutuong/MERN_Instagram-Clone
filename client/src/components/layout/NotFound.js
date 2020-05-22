import React from 'react';
import { Alert } from 'antd';

const NotFound = () => {
  return (
    <main id='login'>
      <div className='login__column'>
        <Alert message='404' description='Page Not Found' type='error' />
      </div>
    </main>
  );
};

export default NotFound;
