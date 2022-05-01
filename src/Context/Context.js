import React, { useState } from "react"

export const Context = React.createContext()
export const ContextProvider = ({ children }) => {
    const [alertModal, setAlertModal] = useState(true);
    const [loadingModal, setLoadingModal] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    return (
        <Context.Provider value={{ alert_h: [alertModal, setAlertModal], loading_h: [loadingModal, setLoadingModal] }}>
            {children}
        </Context.Provider>
    );
}