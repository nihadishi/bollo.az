import axios from "axios";
import { createContext, useState } from "react";

export const BlendingContext = createContext({});

export function BlendingContextProvider({ children }) {

  const [blending, setBlending] = useState(false);
  console.log(blending);
  return (
    <BlendingContext.Provider
      value={{ blending, setBlending }}
    >
      {children}
    </BlendingContext.Provider>
  );
}
