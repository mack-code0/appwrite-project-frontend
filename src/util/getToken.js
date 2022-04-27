import appwritesdk from "./appwritesdk"

const getToken = () => {
    let promise = appwritesdk.createJWT();

    return promise.then(function (response) {
        return {jwt: response.jwt} // Success
    }, function (error) {
        return {error: "An error occured"} // Failure
    });
}

export default getToken