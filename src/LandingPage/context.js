import React, { useContext, createContext, useState } from 'react';
const LandscapingContext = createContext();
const { REACT_APP_SERVER_URL, REACT_APP_AUTH_KEY } = process.env;

export function useLandscaping() {
  return useContext(LandscapingContext);
}

export function LandscapingProvider({ children }) {
  const [newCustomer, setNewCustomer] = useState(null);
  let serverUrl = REACT_APP_SERVER_URL;
  const authKey = REACT_APP_AUTH_KEY;
  
  const value = {
    serverUrl,
    authKey,
    setNewCustomer,
    newCustomer,
  };
  return (
    <LandscapingContext.Provider value={value}>
      {children}
    </LandscapingContext.Provider>
  );
}
