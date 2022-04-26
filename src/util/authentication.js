import appwritesdk from "./appwritesdk";
export const isLoggedIn = () => {
    const storage = localStorage.getItem("gmrauthsess")
    let isLoggedIn;
    if (!storage) {
        isLoggedIn = false
    } else {
        isLoggedIn = true
    }
    return isLoggedIn
}

export const login = (email, password) => {
    // let promise = appwritesdk.getSessions();

    // promise.then(function (response) {
    //     console.log(response); // Success
    // }, function (error) {
    //     console.log(error); // Failure
    // });
    let promise = appwritesdk.createSession(email, password);

    return promise.then(function (response) {
        localStorage.setItem("gmrauthsess", response.$id)
        return true
    }, function (error) {
        return false
    });
}

export const logout = () => {
    localStorage.clear()
}