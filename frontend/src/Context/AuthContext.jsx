import React, { createContext, useState } from 'react';

export const AuthDataContext = createContext();

function AuthContextProvider({ children }) {
  const serverUrl = "http://localhost:8000";
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
