import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

const policeLinks = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Draft FIR', path: '/draft-fir' },
  { name: 'Search Sections', path: '/search-police' },
  { name: 'Profile', path: '/profile' },
];

const publicLinks = [
  { name: 'Home', path: '/public-dashboard' },
  { name: 'Search Legal Sections', path: '/search-public' },
  { name: 'Profile', path: '/profile' },
];

const Layout = () => {
  const { user } = useAuth();

  // This fix prevents the app from crashing when user is null
  const navLinks = user 
    ? (user.role === 'police' ? policeLinks : publicLinks) 
    : [];

  return (
    <div className="layout-wrapper">
      <div className="sidebar-container">
        <Sidebar links={navLinks} />
      </div>
      <main className="main-content">
        <div className="content-area">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
};

export default Layout;