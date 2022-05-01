import React, { useState } from "react"

export const Context = React.createContext()
export const ContextProvider = ({ children }) => {
    const [alert, setAlert] = useState(true);

    return (
        <Context.Provider value={{ alert, setAlert }}>
            {children}
        </Context.Provider>
    );
}