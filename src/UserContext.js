import React, { createContext, useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const saveUserToStorage = async (userData) => {
    try {
      await setDoc(doc(db, "Users", userData.id), userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Error updating user data in Firestore:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: saveUserToStorage }}>
      {children}
    </UserContext.Provider>
  );
};
