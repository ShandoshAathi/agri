export const formatMoisture = (val) => `${val}%`;
export const formatTemp = (val) => `${val}°C`;
export const formatPh = (val) => `pH ${val}`;
export const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();
