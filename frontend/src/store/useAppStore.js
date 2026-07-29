import { useState } from 'react';

export function useAppStore() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeFarmId, setActiveFarmId] = useState('farm_01');

  return {
    activeTab,
    setActiveTab,
    activeFarmId,
    setActiveFarmId
  };
}
