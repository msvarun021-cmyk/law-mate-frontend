import React from 'react';
import { useAuth } from '../../context/AuthContext';

// Placeholder page
const Profile = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>Username:</strong> {user?.username}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Role:</strong> {user?.role}</p>
    </div>
  );
};

export default Profile;