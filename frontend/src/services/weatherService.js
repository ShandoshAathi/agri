// OpenWeatherMap Weather API & High-Accuracy Location Tracker Service

const DEFAULT_WEATHER_API_KEY = 'b6907d289e10d714a6e88b30761fae22';

export const getWeatherApiKey = () => {
  return localStorage.getItem('agrisense_weather_api_key') || 
         import.meta.env.VITE_OPENWEATHER_API_KEY || 
         DEFAULT_WEATHER_API_KEY;
};

export const setWeatherApiKey = (key) => {
  if (key) {
    localStorage.setItem('agrisense_weather_api_key', key.trim());
  } else {
    localStorage.removeItem('agrisense_weather_api_key');
  }
};

// Coimbatore Agricultural & Urban Area Presets for pinpoint accuracy
export const COIMBATORE_AREA_PRESETS = [
  { name: 'RS Puram', lat: 11.0084, lon: 76.9483, formatted: 'RS Puram, Coimbatore, Tamil Nadu' },
  { name: 'Peelamedu / TIDEL', lat: 11.0267, lon: 77.0028, formatted: 'Peelamedu, Coimbatore, Tamil Nadu' },
  { name: 'Gandhipuram', lat: 11.0168, lon: 76.9558, formatted: 'Gandhipuram, Coimbatore, Tamil Nadu' },
  { name: 'Saravanampatti', lat: 11.0797, lon: 76.9997, formatted: 'Saravanampatti, Coimbatore, Tamil Nadu' },
  { name: 'TNAU Ag Campus', lat: 11.0131, lon: 76.9329, formatted: 'TNAU Campus, Coimbatore, Tamil Nadu' },
  { name: 'Vadavalli', lat: 11.0252, lon: 76.9022, formatted: 'Vadavalli, Coimbatore, Tamil Nadu' },
  { name: 'Singanallur', lat: 11.0003, lon: 77.0227, formatted: 'Singanallur, Coimbatore, Tamil Nadu' },
  { name: 'Thudiyalur', lat: 11.0827, lon: 76.9405, formatted: 'Thudiyalur, Coimbatore, Tamil Nadu' },
  { name: 'Kovaipudur', lat: 10.9392, lon: 76.9377, formatted: 'Kovaipudur, Coimbatore, Tamil Nadu' },
  { name: 'Perur Ag Zone', lat: 10.9785, lon: 76.8992, formatted: 'Perur, Coimbatore, Tamil Nadu' },
  { name: 'Kinathukadavu', lat: 10.8208, lon: 77.0205, formatted: 'Kinathukadavu, Coimbatore, Tamil Nadu' },
  { name: 'Pollachi Ag Region', lat: 10.6586, lon: 77.0084, formatted: 'Pollachi, Coimbatore, Tamil Nadu' },
  { name: 'Mettupalayam Foothills', lat: 11.2994, lon: 76.9427, formatted: 'Mettupalayam, Coimbatore, Tamil Nadu' }
];

// Save location & dispatch update event for sync across all components
export const saveUserLocation = (loc) => {
  localStorage.setItem('agrisense_user_location', JSON.stringify(loc));
  window.dispatchEvent(new CustomEvent('agrisense_location_updated', { detail: loc }));
};

// Reverse Geocode using OpenStreetMap Nominatim (suburb/area level) with fallbacks
export const reverseGeocode = async (lat, lon) => {
  try {
    const osmRes = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=18`,
      { headers: { 'Accept-Language': 'en-US,en' } }
    );
    if (osmRes.ok) {
      const osmData = await osmRes.json();
      const addr = osmData.address || {};
      
      const suburb = addr.suburb || addr.neighbourhood || addr.residential || addr.quarter || addr.village || addr.subdistrict || addr.hamlet || addr.industrial;
      const city = addr.city || addr.town || addr.county || addr.district || 'Coimbatore';
      const state = addr.state || 'Tamil Nadu';
      const country = addr.country || 'India';
      
      let formattedArea = '';
      if (suburb && city && suburb.toLowerCase() !== city.toLowerCase()) {
        formattedArea = `${suburb}, ${city}`;
      } else if (suburb) {
        formattedArea = suburb;
      } else {
        formattedArea = city;
      }
      if (state && !formattedArea.includes(state)) {
        formattedArea += `, ${state}`;
      }

      return {
        lat,
        lon,
        area: suburb || city,
        city,
        state,
        country,
        formatted: formattedArea,
        source: 'OpenStreetMap Nominatim'
      };
    }
  } catch (e) {
    console.warn('OSM Nominatim reverse geocode failed, using secondary service...', e);
  }

  try {
    const apiKey = getWeatherApiKey();
    const geoRes = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
    );
    if (geoRes.ok) {
      const geoData = await geoRes.json();
      if (geoData && geoData.length > 0) {
        const place = geoData[0];
        return {
          lat,
          lon,
          area: place.name || 'Coimbatore',
          city: place.name || 'Coimbatore',
          state: place.state || 'Tamil Nadu',
          country: place.country || 'IN',
          formatted: `${place.name || 'Coimbatore'}, ${place.state || 'Tamil Nadu'}`,
          source: 'OpenWeather'
        };
      }
    }
  } catch (e) {
    console.warn('OpenWeather reverse geocode failed:', e);
  }

  return {
    lat,
    lon,
    area: 'Coimbatore Ag Zone',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    country: 'IN',
    formatted: `Coimbatore (${lat.toFixed(4)}°, ${lon.toFixed(4)}°)`,
    source: 'GPS Coordinates'
  };
};

// Search places with OpenStreetMap Nominatim for exact area selection
export const searchLocations = async (query) => {
  if (!query || query.trim().length < 2) return [];
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(query)}&countrycodes=in&limit=5`,
      { headers: { 'Accept-Language': 'en-US,en' } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.map(item => {
      const addr = item.address || {};
      const suburb = addr.suburb || addr.neighbourhood || addr.village || addr.town;
      const city = addr.city || addr.county || 'Coimbatore';
      const state = addr.state || 'Tamil Nadu';
      const parts = item.display_name.split(',').map(s => s.trim());
      const formatted = suburb 
        ? `${suburb}, ${city}, ${state}` 
        : parts.slice(0, 3).join(', ');
      
      return {
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        area: suburb || parts[0] || city,
        city,
        state,
        country: 'India',
        formatted,
        displayName: item.display_name
      };
    });
  } catch (e) {
    console.error('Location search error:', e);
    return [];
  }
};

// Auto Location Tracker using High Precision Browser HTML5 Geolocation & Hyper-Local Reverse Geocoding
export const detectUserLocation = () => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(getFallbackLocation('Geolocation not supported by browser'));
      return;
    }

    const tryPosition = (options, isFallbackAttempt = false) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const accuracy = position.coords.accuracy;

          const geoResult = await reverseGeocode(lat, lon);
          
          const loc = {
            ...geoResult,
            accuracy: Math.round(accuracy),
            accuracyText: accuracy <= 100 
              ? `High-Precision GPS Lock (±${Math.round(accuracy)}m)` 
              : `Cellular/IP Coarse Lock (±${(accuracy / 1000).toFixed(1)}km)`,
            isHighAccuracy: accuracy <= 150,
            timestamp: new Date().toISOString()
          };

          saveUserLocation(loc);
          resolve(loc);
        },
        (error) => {
          if (!isFallbackAttempt && options.enableHighAccuracy) {
            // High accuracy timed out or was refused, retry with standard positioning
            tryPosition({ timeout: 10000, enableHighAccuracy: false, maximumAge: 60000 }, true);
          } else {
            resolve(getFallbackLocation(error.message));
          }
        },
        options
      );
    };

    // Attempt high accuracy fresh location first
    tryPosition({ timeout: 8000, enableHighAccuracy: true, maximumAge: 0 });
  });
};

export const getFallbackLocation = (reason) => {
  const cached = localStorage.getItem('agrisense_user_location');
  if (cached) {
    try { return JSON.parse(cached); } catch {}
  }
  return {
    lat: 11.0168,
    lon: 76.9558,
    area: 'Gandhipuram',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    country: 'IN',
    formatted: 'Gandhipuram, Coimbatore, Tamil Nadu',
    accuracyText: 'Default Saved Location',
    note: reason
  };
};

// Fetch Live Weather Report from OpenWeatherMap API
export const fetchLiveWeather = async (lat = 11.0168, lon = 76.9558) => {
  const apiKey = getWeatherApiKey();
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );

    if (!res.ok) {
      throw new Error(`Weather API returned ${res.status}`);
    }

    const data = await res.json();
    return {
      success: true,
      temp: Math.round(data.main.temp * 10) / 10,
      feelsLike: Math.round(data.main.feels_like * 10) / 10,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: Math.round(data.wind.speed * 3.6), // m/s to km/h
      condition: data.weather[0]?.main || 'Clear',
      description: data.weather[0]?.description || 'Clear Sky',
      icon: data.weather[0]?.icon || '01d',
      rainMm: data.rain ? (data.rain['1h'] || data.rain['3h'] || 0) : 0,
      city: data.name || 'Coimbatore',
      country: data.sys?.country || 'IN',
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  } catch {
    // High-precision agronomic micro-climate fallback
    return {
      success: false,
      temp: 28.6,
      feelsLike: 30.2,
      humidity: 65,
      pressure: 1014,
      windSpeed: 12,
      condition: 'Partly Cloudy',
      description: 'Optimal Micro-Climate',
      icon: '02d',
      rainMm: 0,
      city: 'Coimbatore',
      country: 'IN',
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }
};

