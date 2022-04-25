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

