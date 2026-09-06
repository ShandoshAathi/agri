/* eslint-disable react/only-export-components, react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const initialUsers = {
  manager: {
    id: 'usr_mgr_01',
    name: 'Dr. Arthur Vance',
    email: 'manager@agrisense.io',
    role: 'manager',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    title: 'Senior Farm Operations Director',
    phone: '+1 (555) 234-5678',
    location: 'Central AgTech Hub, California',
    assignedFarmsCount: 4
  },
  farmer: {
    id: 'usr_frm_01',
    name: 'Elena Rostova',
    email: 'elena@agrisense.io',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    title: 'Lead Crop Specialist',
    phone: '+1 (555) 876-5432',
    location: 'Green Valley Sector 4',
    assignedFarmId: 'farm_01'
  }
};

export const AuthProvider = ({ children }) => {
  // Default logged in state for initial interactive preview
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [role, setRole] = useState('manager'); // 'manager' or 'farmer'
  const [user, setUser] = useState(initialUsers.manager);

  const switchRole = (newRole) => {
    setRole(newRole);
    setUser(initialUsers[newRole]);
  };

  const login = (email, password, selectedRole) => {
    setIsAuthenticated(true);
    setRole(selectedRole);
    setUser(initialUsers[selectedRole] || {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0],
      email,
      role: selectedRole
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, user, switchRole, login, logout, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
