import appwritesdk from "./appwritesdk";
export const isLoggedIn = (cb) => {
    const storage = localStorage.getItem("gmrauthsess")

    if (!storage) {
        return cb(false)
    }

    let getSession = appwritesdk.account.getSession(storage)
    getSession.then(function (session) {
        if (!session) return cb(false)

        if ((session.expire * 1000) <= Date.now()) {
            let updateSessionPromise = appwritesdk.account.updateSession()
            updateSessionPromise.then(function (updatedSession) {
                return cb(true)
            }, function (updatedSessionError) {
                return cb(false)
            })
        }

        return cb(true)
    }, function (error) {
        return cb(false)
    })
}

export const genToken = async () => {
    const token = localStorage?.getItem("gmrauthtoken")
    if (!token) {
        let response = await appwritesdk.account.createJWT();
        localStorage.setItem("gmrauthtoken", response.jwt)
    }
}


export const login = (email, password) => {
    let promise = appwritesdk.account.createSession(email, password);

    return promise.then(function (response) {
        localStorage.setItem("gmrauthsess", response.$id)
        localStorage.setItem("gmrauthid", response.userId)
        return true
    }, function (error) {
        // if(error.code === 429){
        //     alert("Too many request")
        // }
        alert(error)
        return false
    });
}


export const logout = (cb) => {
    const sessionId = localStorage.getItem("gmrauthsess")
    let promise = appwritesdk.account.deleteSession(sessionId)
    promise.then(function (response) {
        localStorage.clear()
        cb({ code: 200 })
    }, function (error) {
        cb({ code: 400 })
    })
}