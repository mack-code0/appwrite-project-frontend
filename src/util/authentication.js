import appwritesdk from "./appwritesdk";
export const isLoggedIn = () => {
    const storage = localStorage.getItem("gmrauthsess")
    
    if(!storage){
        return false
    }
    let _value;

    let getSession = appwritesdk.getSession(storage)
    getSession.then(function (session) {
        if (!session) {
            _value = false
            return
        }

        if ((session.expire * 1000) <= Date.now()) {
            let updateSessionPromise = appwritesdk.updateSession()
            updateSessionPromise.then(function (updatedSession){
                _value = true
                return
            }, function (updatedSessionError){
                _value = false
                return
            })
        }

        _value = true
        return
    }, function (error) {
        _value = false
        return
    })

    return _value
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

export const logout = () => {
    const sessionId = localStorage.getItem("gmrauthsess")
    let promise = appwritesdk.deleteSession(sessionId)
    promise.then(function (response) {
        console.log("object");
        localStorage.clear()
    }, function (error) {
        console.log(error);
    })
}