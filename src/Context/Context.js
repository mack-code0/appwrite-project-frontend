import React, { useState, useEffect } from "react"
import { isAuth } from "../util/authentication"

export const Context = React.createContext()
export const ContextProvider = ({ children }) => {
    const [alertModal, setAlertModal] = useState({
        mode: false,
        msg: "",
        icon: "error"
    });
    const [isLoading, setIsLoading] = useState(true)
    const [isloggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        isAuth(bool => setIsLoggedIn(bool))
    }, [])


    return (
        <Context.Provider value={
            {
                alert_h: [alertModal, setAlertModal],
                isLoading_h: [isLoading, setIsLoading],
                isLoggedIn_h: [isloggedIn, setIsLoggedIn]
            }
        }>
            {children}
        </Context.Provider>
    );
}