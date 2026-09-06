/* eslint-disable react/only-export-components, react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

const FarmContext = createContext();

const initialFarms = [
  {
    id: 'farm_01',
    name: 'Green Valley Field A',
    location: 'GKVK Agriculture Research Road, Bengaluru',
    crop: 'Tomato (Hybrid Rome)',
    size: '14.5 Acres',
    assignedFarmer: 'Elena Rostova',
    assignedFarmerId: 'usr_frm_01',
    status: 'Optimal',
    healthScore: 94,
    deviceCount: 5,
    soilType: 'Loamy Soil',
    established: '2024-03-15',
    center: [13.0784, 77.5815],
    boundary: [
      [13.0800, 77.5795],
      [13.0810, 77.5835],
      [13.0765, 77.5840],
      [13.0760, 77.5800]
    ],
    gridCols: 4,
    gridRows: 4,
    gridSize: '15m',
    contourMode: 'moisture'
  },
  {
    id: 'farm_02',
    name: 'Sunrise Corn Plantation',
    location: 'Central Valley Ag Avenue, Fresno CA',
    crop: 'Sweet Corn',
    size: '28.0 Acres',
    assignedFarmer: 'Marcus Sterling',
    assignedFarmerId: 'usr_frm_02',
    status: 'Attention Needed',
    healthScore: 78,
    deviceCount: 8,
    soilType: 'Silt Loam',
    established: '2023-09-10',
    center: [36.7378, -119.7871],
    boundary: [
      [36.7400, -119.7900],
      [36.7410, -119.7840],
      [36.7350, -119.7830],
      [36.7340, -119.7890]
    ],
    gridCols: 5,
    gridRows: 4,
    gridSize: '20m',
    contourMode: 'elevation'
  },
  {
    id: 'farm_03',
    name: 'Highland Wheat Fields',
    location: 'Highland Ridge Road, Boulder CO',
    crop: 'Winter Wheat',
    size: '42.0 Acres',
    assignedFarmer: 'Sophia Chen',
    assignedFarmerId: 'usr_frm_03',
    status: 'Optimal',
    healthScore: 91,
    deviceCount: 12,
    soilType: 'Clay Loam',
    established: '2024-01-20',
    center: [12.9550, 77.6200],
    boundary: [
      [12.9580, 77.6160],
      [12.9590, 77.6240],
      [12.9510, 77.6250],
      [12.9500, 77.6170]
    ],
    gridCols: 6,
    gridRows: 5,
    gridSize: '25m',
    contourMode: 'ndvi'
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
    established: '2025-05-01',
    center: [12.9400, 77.5800],
    boundary: [
      [12.9415, 77.5785],
      [12.9420, 77.5815],
      [12.9385, 77.5820],
      [12.9380, 77.5790]
    ],
    gridCols: 3,
    gridRows: 3,
    gridSize: '10m',
    contourMode: 'temperature'
  }
];

const initialDevices = [
  { id: 'ESP32-NODE-01', name: 'Soil & DHT Array #1', farmId: 'farm_01', status: 'Online', battery: '96%', lastPing: 'Just now', IP: '192.168.1.104', coords: [12.9722, 77.5938], zone: 'A2' },
  { id: 'ESP32-NODE-02', name: 'Tank & Rain Sensor #1', farmId: 'farm_01', status: 'Online', battery: '88%', lastPing: '2s ago', IP: '192.168.1.105', coords: [12.9712, 77.5952], zone: 'B3' },
  { id: 'ESP32-NODE-03', name: 'pH Probes & Moisture #2', farmId: 'farm_01', status: 'Online', battery: '92%', lastPing: 'Just now', IP: '192.168.1.106', coords: [12.9728, 77.5948], zone: 'C1' },
  { id: 'ESP32-NODE-04', name: 'Corn Field East Sensor', farmId: 'farm_02', status: 'Online', battery: '74%', lastPing: '5s ago', IP: '192.168.1.110', coords: [12.9855, 77.6055], zone: 'A1' },
  { id: 'ESP32-NODE-05', name: 'Greenhouse Climate Hub', farmId: 'farm_04', status: 'Online', battery: '100%', lastPing: 'Just now', IP: '192.168.1.120', coords: [12.9402, 77.5802], zone: 'B2' }
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
  
  // Settings & Automation Thresholds
  const [settings, setSettings] = useState({
    autoIrrigation: true,
    minSoilMoistureThreshold: 35, // %
    maxSoilMoistureThreshold: 75, // %
    rainSensorOverride: true,
    tankMinLevel: 20, // %
    tempAlertUpper: 38, // °C
    phAlertMin: 5.5,
    phAlertMax: 7.5,
    language: 'English',
    theme: 'Dark Glass',
    pushNotifications: true
  });

  const selectedFarm = farms.find(f => f.id === selectedFarmId) || farms[0];

  const addFarm = (newFarm) => {
    const farmWithId = {
      ...newFarm,
      id: `farm_0${farms.length + 1}`,
      healthScore: 90,
      deviceCount: 0,
      center: [12.9716, 77.5946],
      boundary: [
        [12.9730, 77.5925],
        [12.9735, 77.5960],
        [12.9705, 77.5970],
        [12.9698, 77.5930]
      ],
      gridCols: 4,
      gridRows: 4,
      gridSize: '15m',
      contourMode: 'moisture'
    };
    setFarms(prev => [...prev, farmWithId]);
  };

  const updateFarmBoundary = (farmId, boundaryCoords, calculatedSize = null) => {
    setFarms(prev => prev.map(f => {
      if (f.id === farmId) {
        // Calculate new center
        const lats = boundaryCoords.map(pt => pt[0]);
        const lngs = boundaryCoords.map(pt => pt[1]);
        const centerLat = lats.reduce((a, b) => a + b, 0) / lats.length;
        const centerLng = lngs.reduce((a, b) => a + b, 0) / lngs.length;
        return {
          ...f,
          boundary: boundaryCoords,
          center: [centerLat, centerLng],
          ...(calculatedSize ? { size: calculatedSize } : {})
        };
      }
      return f;
    }));
  };

  const updateFarmGridSettings = (farmId, { gridCols, gridRows, gridSize }) => {
    setFarms(prev => prev.map(f => f.id === farmId ? { ...f, gridCols, gridRows, gridSize } : f));
  };

  const updateFarmContourMode = (farmId, contourMode) => {
    setFarms(prev => prev.map(f => f.id === farmId ? { ...f, contourMode } : f));
  };

  const updateDevicePosition = (deviceId, coords, zoneName) => {
    setDevices(prev => prev.map(d => d.id === deviceId ? { ...d, coords, zone: zoneName || d.zone } : d));
  };

  const addDevice = (newDevice) => {
    setDevices(prev => [...prev, {
      ...newDevice,
      status: 'Online',
      battery: '100%',
      lastPing: 'Just now',
      coords: newDevice.coords || selectedFarm.center
    }]);
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
      updateFarmBoundary,
      updateFarmGridSettings,
      updateFarmContourMode,
      devices,
      addDevice,
      updateDevicePosition,
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
