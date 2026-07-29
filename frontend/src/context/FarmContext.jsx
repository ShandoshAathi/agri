import React, { createContext, useContext, useState } from 'react';

const FarmContext = createContext();

const initialFarms = [
  {
    id: 'farm_01',
    name: 'Green Valley Field A',
    location: 'Sector 4, Valley Region',
    crop: 'Tomato (Hybrid Rome)',
    size: '14.5 Acres',
    assignedFarmer: 'Elena Rostova',
    assignedFarmerId: 'usr_frm_01',
    status: 'Optimal',
    healthScore: 94,
    deviceCount: 5,
    soilType: 'Loamy Soil',
    established: '2024-03-15'
  },
  {
    id: 'farm_02',
    name: 'Sunrise Corn Plantation',
    location: 'North Block 12',
    crop: 'Sweet Corn',
    size: '28.0 Acres',
    assignedFarmer: 'Marcus Sterling',
    assignedFarmerId: 'usr_frm_02',
    status: 'Attention Needed',
    healthScore: 78,
    deviceCount: 8,
    soilType: 'Silt Loam',
    established: '2023-09-10'
  },
  {
    id: 'farm_03',
    name: 'Highland Wheat Fields',
    location: 'East Slope 03',
    crop: 'Winter Wheat',
    size: '42.0 Acres',
    assignedFarmer: 'Sophia Chen',
    assignedFarmerId: 'usr_frm_03',
    status: 'Optimal',
    healthScore: 91,
    deviceCount: 12,
    soilType: 'Clay Loam',
    established: '2024-01-20'
  },
  {
    id: 'farm_04',
    name: 'Horizon Smart Greenhouse',
    location: 'South Tech Facility',
    crop: 'Bell Pepper & Cucumber',
    size: '5.2 Acres',
    assignedFarmer: 'David Kalu',
    assignedFarmerId: 'usr_frm_04',
    status: 'Irrigation Active',
    healthScore: 98,
    deviceCount: 6,
    soilType: 'Coco Coir Substrate',
    established: '2025-05-01'
  }
];

const initialDevices = [
  { id: 'ESP32-NODE-01', name: 'Soil & DHT Array #1', farmId: 'farm_01', status: 'Online', battery: '96%', lastPing: 'Just now', IP: '192.168.1.104' },
  { id: 'ESP32-NODE-02', name: 'Tank & Rain Sensor #1', farmId: 'farm_01', status: 'Online', battery: '88%', lastPing: '2s ago', IP: '192.168.1.105' },
  { id: 'ESP32-NODE-03', name: 'pH Probes & Moisture #2', farmId: 'farm_01', status: 'Online', battery: '92%', lastPing: 'Just now', IP: '192.168.1.106' },
  { id: 'ESP32-NODE-04', name: 'Corn Field East Sensor', farmId: 'farm_02', status: 'Online', battery: '74%', lastPing: '5s ago', IP: '192.168.1.110' },
  { id: 'ESP32-NODE-05', name: 'Greenhouse Climate Hub', farmId: 'farm_04', status: 'Online', battery: '100%', lastPing: 'Just now', IP: '192.168.1.120' }
];

const initialNotifications = [
  { id: 1, type: 'warning', title: 'Low Soil Moisture Detected', farm: 'Green Valley Field A', message: 'Moisture dropped below 32%. Automatic irrigation queued.', time: '10 mins ago', read: false },
  { id: 2, type: 'success', title: 'Smart Pump Engaged', farm: 'Sunrise Corn Plantation', message: 'Pump #2 started automatically based on moisture threshold.', time: '25 mins ago', read: false },
  { id: 3, type: 'alert', title: 'Possible Early Blight Detected', farm: 'Green Valley Field A', message: 'AI diagnosis scan flagged 84% severity risk on sample leaf.', time: '1 hour ago', read: true },
  { id: 4, type: 'info', title: 'System Firmware Update Complete', farm: 'All Nodes', message: 'ESP32 Mesh v2.4 successfully applied to all gateway nodes.', time: '3 hours ago', read: true }
];

export const FarmProvider = ({ children }) => {
  const [farms, setFarms] = useState(initialFarms);
  const [selectedFarmId, setSelectedFarmId] = useState('farm_01');
  const [devices, setDevices] = useState(initialDevices);
  const [notifications, setNotifications] = useState(initialNotifications);
  
  const [settings, setSettings] = useState({
    autoIrrigation: true,
    minSoilMoistureThreshold: 35,
    maxSoilMoistureThreshold: 75,
    rainSensorOverride: true,
    tankMinLevel: 20,
    tempAlertUpper: 38,
    phAlertMin: 5.5,
    phAlertMax: 7.5,
    language: 'English',
    theme: 'Dark Glass',
    pushNotifications: true
  });

  const selectedFarm = farms.find(f => f.id === selectedFarmId) || farms[0];

  const addFarm = (newFarm) => {
    const farmWithId = { ...newFarm, id: `farm_0${farms.length + 1}`, healthScore: 90, deviceCount: 0 };
    setFarms(prev => [...prev, farmWithId]);
  };

  const addDevice = (newDevice) => {
    setDevices(prev => [...prev, { ...newDevice, status: 'Online', battery: '100%', lastPing: 'Just now' }]);
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <FarmContext.Provider value={{
      farms,
      selectedFarm,
      selectedFarmId,
      setSelectedFarmId,
      addFarm,
      devices,
      addDevice,
      notifications,
      markNotificationRead,
      clearAllNotifications,
      settings,
      setSettings
    }}>
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => useContext(FarmContext);
