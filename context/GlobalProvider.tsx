import { getCurrentUser } from "@/lib/appwrite";
import React, { ReactNode } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { Models } from "react-native-appwrite";

const GlobalContext = createContext<any>(null);

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [user, setUser] = useState<null | Models.Document>(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (!res) {
          setisLoggedIn(false);
          setUser(null);
          return;
        }
        setisLoggedIn(true);
        setUser(res);
      })
      .catch(() => {
        console.log("User not logged in");
      })
      .finally(() => {
        setisLoading(false);
      });
    return () => {};
  }, []);

  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, setisLoggedIn, user, setUser, isLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
