import appwritesdk from "./appwritesdk";
export const isLoggedIn = (cb) => {
    const storage = localStorage.getItem("gmrauthsess")

    if (!storage) {
        return cb(false)
    }

    let getSession = appwritesdk.getSession(storage)
    getSession.then(function (session) {
        if (!session) return cb(false)

        if ((session.expire * 1000) <= Date.now()) {
            let updateSessionPromise = appwritesdk.updateSession()
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

const getSession = async (id) => {
    try {
        let session = await appwritesdk.getSession(id)
        if ((session.expire * 1000) <= Date.now()) {
            await appwritesdk.updateSession(id)
            return true
        }
        return true
    }catch(err){
        return false
    }
}

export const login = (email, password) => {
    let promise = appwritesdk.createSession(email, password);

    return promise.then(function (response) {
        localStorage.setItem("gmrauthsess", response.$id)
        return true
    }, function (error) {
        // if(error.code === 429){
        //     alert("Too many request")
        // }
        return false
    });
}

export const logout = (cb) => {
    const sessionId = localStorage.getItem("gmrauthsess")
    let promise = appwritesdk.deleteSession(sessionId)
    promise.then(function (response) {
        localStorage.clear()
        cb({code: 200})
    }, function (error) {
        cb({code: 400})
    })
}