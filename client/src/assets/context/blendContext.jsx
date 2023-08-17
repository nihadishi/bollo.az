import axios from "axios";
import { createContext, useState } from "react";

export const BlendingContext = createContext({});

export function BlendingContextProvider({ children }) {

  const [blending, setBlending] = useState(false);
  return (
    <BlendingContext.Provider
      value={{ blending, setBlending }}
    >
      {children}
    </BlendingContext.Provider>
  );
}
