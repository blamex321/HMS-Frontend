import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 bg-gray-100">
        <Topbar />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
