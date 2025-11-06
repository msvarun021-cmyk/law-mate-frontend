import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

// Define navigation links based on role
const policeLinks = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Draft FIR', path: '/draft-fir' },
  { name: 'Search Sections', path: '/search' },
  { name: 'Reformat Complaint', path: '/reformat' },
  { name: 'History', path: '/history' },
];

const publicLinks = [
  { name: 'Home', path: '/public-dashboard' },
  { name: 'Search Legal Sections', path: '/search' },
  { name: 'Write Complaint', path: '/write-complaint' },
];

const Layout = () => {
  const { user } = useAuth();
  const navLinks = user.role === 'police' ? policeLinks : publicLinks;

  return (
    <div className="layout-wrapper">
      <div className="sidebar-container">
        <Sidebar links={navLinks} />
      </div>
      <main className="main-content">
        {/* We can add a top Navbar here if needed */}
        {/* <Navbar /> */}
        <div className="content-area">
          <Outlet /> {/* This renders the matched child route */}
        </div>
      </main>
    </div>
  );
};

export default Layout;