import React, { createContext, useState, useContext } from 'react';

const isLoginContext = createContext();

export const useIsLogin = () => {
  return useContext(isLoginContext);
};

export const IsLoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <isLoginContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </isLoginContext.Provider>
  );
};