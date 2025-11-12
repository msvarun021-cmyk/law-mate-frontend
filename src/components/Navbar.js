import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '1rem 2rem',
      background: '#fff',
      borderBottom: '1px solid #e5e7eb'
    }}>
      {user && (
        <span style={{ fontWeight: '500' }}>
          Welcome, {user.username}
        </span>
      )}
    </div>
  );
};

export default Navbar;