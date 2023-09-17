import { createContext, useState } from "react";

export const BackendUrlContext = createContext({});

export function BackendUrlContextProvider({ children }) {

  const [baseUrl, setbaseUrl] = useState("https://bollo-az-api.vercel.app");
  return (
    <BackendUrlContext.Provider
      value={{ baseUrl }}
    >
      {children}
    </BackendUrlContext.Provider>
  );
}