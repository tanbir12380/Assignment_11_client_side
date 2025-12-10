import React from 'react';
import Footer from './Footer';
import { Outlet } from 'react-router';

const Root = () => {



  return (
    <div className='light_theme'>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;