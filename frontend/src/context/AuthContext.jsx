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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('farmer');
  const [user, setUser] = useState({
    ...initialUsers.farmer,
    acceptedTerms: true,
    acceptedTermsTimestamp: new Date().toISOString()
  });

  const switchRole = (newRole) => {
    setRole(newRole);
    setUser({
      ...initialUsers[newRole],
      acceptedTerms: true,
      acceptedTermsTimestamp: new Date().toISOString()
    });
  };

  const acceptTerms = () => {
    setUser(prev => ({
      ...prev,
      acceptedTerms: true,
      acceptedTermsTimestamp: new Date().toISOString()
    }));
  };

  const login = (credentials, password, selectedRole) => {
    let finalData = {};
    if (typeof credentials === 'object' && credentials !== null) {
      finalData = credentials;
    } else {
      finalData = { email: credentials, role: selectedRole };
    }

    const targetRole = finalData.role || selectedRole || 'farmer';
    const baseUser = initialUsers[targetRole] || initialUsers.farmer;

    setIsAuthenticated(true);
    setRole(targetRole);
    setUser({
      ...baseUser,
      id: `usr_${Date.now()}`,
      name: finalData.name || baseUser.name,
      email: finalData.email || baseUser.email,
      phone: finalData.phone || baseUser.phone,
      role: targetRole,
      farmName: finalData.farmName || 'My Smart Farm',
      location: finalData.farmLocation || baseUser.location,
      farmArea: finalData.farmArea || '10',
      farmUnit: finalData.farmUnit || 'Acres',
      crop: finalData.crop || 'Tomato',
      soilType: finalData.soilType || 'Loamy Soil',
      acceptedTerms: true,
      acceptedTermsTimestamp: new Date().toISOString()
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, user, switchRole, login, logout, acceptTerms, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
