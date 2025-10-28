import React, { createContext, useState } from 'react';

export const AuthDataContext = createContext();

function AuthContextProvider({ children }) {
  const serverUrl = "https://airbnb-server-y12j.onrender.com";
  const [loading, setLoading] = useState(false);

  const value = {
    serverUrl,
    loading,
    setLoading
  };

  return (
    <AuthDataContext.Provider value={value}>
      {children}
    </AuthDataContext.Provider>
  );
}

export default AuthContextProvider;
