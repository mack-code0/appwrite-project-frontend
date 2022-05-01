import React, { useState } from "react"

const Context = React.createContext()
export const ContextProvider = ({ children }) => {
    const [alert, setAlert] = useState(false);
  
    return (
        <Context.Provider value={{ alert, setAlert }}>
            {children}
        </Context.Provider>
    );
}