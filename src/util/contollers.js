import appwritesdk from "./appwritesdk"


export const createInfo = async (address, name, city, country, edit) => {
    const infoObj = {
        address: address,
        name: name,
        city: city,
        country: country
    }

    const USER_ID = localStorage.getItem("gmrauthid")

    try {
        if (edit) {
            await appwritesdk.database.updateDocument("626d506c8a3d66550de7", USER_ID, { ...infoObj })
        } else {
            await appwritesdk.database.createDocument("626d506c8a3d66550de7", USER_ID, { ...infoObj })
        }
        return { message: "successfull" }
    } catch (error) {
        return { error: error }
    }
}


export const getInfo = async () => {
    const USER_ID = localStorage.getItem("gmrauthid")
    try {
        const doc = await appwritesdk.database.getDocument("626d506c8a3d66550de7", USER_ID)
        const { name, address, city, country } = doc
        return { data: { name, address, city, country } }
    } catch (error) {
        return { error: "User has no Info yet" }
    }
}

export const getReceipts = async (search) => {
    try {
        const list = await appwritesdk.storage.listFiles("62542994aa8a5d9ac42d", search)
        console.log(list)
        const fileIds = []
        list.files.forEach(file => {
            fileIds.push({ id: file.$id, date: file.dateCreated, name: file.name.split("-")[0] })
        })
        return fileIds
    } catch (err) {
        throw new Error("An error occured")
    }
}

export const viewReceipt = async (id) => {
    try {
        const receipt = appwritesdk.storage.getFileView("62542994aa8a5d9ac42d", id)
        return receipt.href
    } catch (err) {
        throw new Error("An error occured!")
    }
}

export const deleteReceipt = async (id) => {
    try {
        await appwritesdk.storage.deleteFile("62542994aa8a5d9ac42d", id)
    } catch (err) {
        throw new Error("An error occured!")
    }
}