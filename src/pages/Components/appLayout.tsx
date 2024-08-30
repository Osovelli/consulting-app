import React from 'react';
import Header from './header_application';

const AppLayout = ({ children }: {
    children: React.ReactNode
}) => {
  return (
    <div className='px-6 bg-[#F6F8FA]'>
      <Header />
        {children}
    </div>
  );
};

export default AppLayout;