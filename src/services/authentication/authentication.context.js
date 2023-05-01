import React, { useState, createContext } from "react";

import { loginRequest } from "./authentication.service";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const auth = getAuth();
  onAuthStateChanged(auth, (usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    console.log("context email is ", email);
    console.log("context password is ", password);
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log("error is: ",e.message);
        const errorArray = e.message.replaceAll(").",".").split("auth/");
        if(errorArray.length>0){
          setError(errorArray[1]);
        }else{
          setError(e.message);
        }
        
      });
  };

  const onLogout = () => {
    setIsLoading(true);
    signOut(auth).then(() => {
      setUser(null);
      setError(null);
      setIsLoading(false);
    });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
