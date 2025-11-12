import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

// Define navigation links based on role
const policeLinks = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Draft FIR', path: '/draft-fir' },
  { name: 'Search Sections', path: '/search-police' }, // Updated path
  { name: 'Profile', path: '/profile' },
  // Add other police routes here
];

const publicLinks = [
  { name: 'Home', path: '/public-dashboard' },
  { name: 'Search Legal Sections', path: '/search-public' }, // Updated path
  { name: 'Profile', path: '/profile' },
  // Add other public routes here
];

const Layout = () => {
  const { user } = useAuth();

  // !!!!! THIS IS THE FIX !!!!!
  // We check if user exists. If not, we provide an empty array
  // so the app doesn't crash while it's loading or redirecting.
  const navLinks = user 
    ? (user.role === 'police' ? policeLinks : publicLinks) 
    : [];

  return (
    <div className="layout-wrapper">
      <div className="sidebar-container">
        {/* We only show the sidebar if we have links to show */}
        <Sidebar links={navLinks} />
      </div>
      <main className="main-content">
        <div className="content-area">
          <Outlet /> {/* This renders the matched child route */}
        </div>
      </main>
    </div>
  );
};

export default Layout;