import React, { useState, createContext } from "react";

import { loginRequest } from "./authentication.service";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoginCallProgress, setIsLoginCallProgress] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const auth = getAuth();
  onAuthStateChanged(auth, (usr) => {
    if (usr) {
      setUser(usr);
      setIsAuthenticated(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setIsAuthenticated(false);
    }
  });

  const onLogin = (email, password) => {
    setIsLoginCallProgress(true);
    console.log("context email is ", email);
    console.log("context password is ", password);
    return  loginRequest(email, password);
     
  };

  const onLogout = () => {
    setIsLoading(true);
    return signOut(auth);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        user,
        isLoading,
        isLoginCallProgress,
        error,
        onLogin,
        onLogout,
        setIsLoginCallProgress,
        setIsLoading,
        setUser,
        setError
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
