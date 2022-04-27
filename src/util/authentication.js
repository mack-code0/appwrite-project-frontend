import appwritesdk from "./appwritesdk";
import getToken from "./getToken";
export const isLoggedIn = () => {
    const storage = localStorage.getItem("gmrauthsess")

    if (!storage) {
        return false
    }

    let getSession = appwritesdk.getSession(storage)
    getSession.then(function (session) {
        if (!session) return false

        if ((session.expire * 1000) <= Date.now()) {
            let updateSessionPromise = appwritesdk.updateSession()
            return updateSessionPromise.then(function (updatedSession){
                return true
            }, function (updatedSessionError){
                return false
            })
        }

        return true
    }, function (error) {
        console.log({ error: error });
        return false
    })
}

export const login = (email, password) => {
    let promise = appwritesdk.createSession(email, password);

    return promise.then(function (response) {
        localStorage.setItem("gmrauthsess", response.$id)
        return true
    }, function (error) {
        return false
    });
}

export const logout = () => {
    const sessionId = localStorage.getItem("gmrauthsess")
    let promise = appwritesdk.deleteSession(sessionId)
    promise.then(function (response) {
        localStorage.clear()
    }, function (error) {
        console.log(error);
    })
}