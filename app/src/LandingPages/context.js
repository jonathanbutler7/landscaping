import React, { useContext, createContext, useState } from 'react';
const LandscapingContext = createContext();
const { REACT_APP_SERVER_URL, REACT_APP_AUTH_KEY, REACT_APP_MAPQUEST_KEY } = process.env;

export function useLandscaping() {
  return useContext(LandscapingContext);
}

export function LandscapingProvider({ children }) {
  const [newCustomer, setNewCustomer] = useState(null);
  let serverUrl = REACT_APP_SERVER_URL;
  const authKey = REACT_APP_AUTH_KEY;
  const mapKey = REACT_APP_MAPQUEST_KEY;
  
  const value = {
    serverUrl,
    authKey,
    setNewCustomer,
    newCustomer,
    mapKey,
  };
  return (
    <LandscapingContext.Provider value={value}>
      {children}
    </LandscapingContext.Provider>
  );
}
