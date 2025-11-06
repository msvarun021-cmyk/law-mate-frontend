import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css'; // We'll create this CSS file

const Sidebar = ({ links }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      <div className="sidebar-logo">
        <h2>Law Mate</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {links.map((link) => (
            <li key={link.name}>
              <NavLink 
                to={link.path}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;