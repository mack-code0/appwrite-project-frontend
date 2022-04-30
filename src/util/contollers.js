import appwritesdk from "./appwritesdk"
export const createInfo = async (address, name, city, country) => {
    try {
        await appwritesdk.database.createDocument("626d506c8a3d66550de7", "unique()", {
            address: address,
            name: name,
            city: city,
            country: country
        })
        return { message: "successfull" }
    } catch (error) {
        return { error: error }
    }
}

export const getInfo = async () => {
    const id = localStorage.getItem("gmrauthid")
    try {
        const doc = await appwritesdk.database.getDocument("626d506c8a3d66550de7", "626d549ac0f3056fba1d")
        const { name, address, city, country } = doc
        return { data: {name, address, city, country} }
    } catch (error) {
        console.log(error);
    }
}