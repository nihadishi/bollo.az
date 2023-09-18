import { createContext, useState } from "react";

export const BackendUrlContext = createContext({});

export function BackendUrlContextProvider({ children }) {

  const [baseUrl, setbaseUrl] = useState("https://bollo-az-api.vercel.app");
  // const [baseUrl, setbaseUrl] = useState("http://localhost:5000/");
  return (
    <BackendUrlContext.Provider
      value={{ baseUrl }}
    >
      {children}
    </BackendUrlContext.Provider>
  );
}