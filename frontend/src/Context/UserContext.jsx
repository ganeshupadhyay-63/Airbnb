import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthDataContext } from './AuthContext'; 

export const UserDataContext = createContext();


function UserContextProvider({ children }) {
  const { serverUrl } = useContext(AuthDataContext); 
  const [userData, setUserData] = useState(null);

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/user/currentuser", {
        withCredentials: true,
      });
      setUserData(result.data);
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []); 

  let value = {
    userData,
    setUserData, getCurrentUser
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserContextProvider;
