import React, { useState } from "react"
import { isAuth } from "../util/authentication"

export const Context = React.createContext()
export const ContextProvider = ({ children }) => {
    const [alertModal, setAlertModal] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false)
    const [isloggedIn, setIsLoggedIn] = useState(false)

    
    return (
        <Context.Provider value={
            {
                alert_h: [alertModal, setAlertModal],
                loading_h: [loadingModal, setLoadingModal],
                isLoggedIn_h: [isloggedIn, setIsLoggedIn]
            }
        }>
            {children}
        </Context.Provider>
    );
}