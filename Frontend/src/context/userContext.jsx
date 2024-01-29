import React, { createContext, useEffect, useState } from "react";
import { URLBACK } from "../App.jsx";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = localStorage.getItem("userData");
        setUser(userData);
        if (userData) {
          setUserId(userData.id);
        } else {
          const intervalId = setInterval(getUser, 5 * 1000);
          return () => clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    getUser();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
