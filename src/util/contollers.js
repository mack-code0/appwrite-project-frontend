import appwritesdk from "./appwritesdk"

import { send, init } from "emailjs-com";

const serviceId = process.env.REACT_APP_EMAIL_SERVICE_ID;
const templateId = process.env.REACT_APP_EMAIL_TEMPLATE_ID;
const userID = process.env.REACT_APP_EMAIL_USER_ID;

export const sendEmail = async (content) => {
    init(userID);
    const toSend = {
        to_email: content.email
    };
    try {
        const res = await send(serviceId, templateId, toSend);
        console.log(res);
    } catch (err) {
        console.log(err);
    }
};


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
            await appwritesdk.database.updateDocument(process.env.REACT_APP_COLLECTION_ID, USER_ID, { ...infoObj })
        } else {
            await appwritesdk.database.createDocument(process.env.REACT_APP_COLLECTION_ID, USER_ID, { ...infoObj })
        }
        return { message: "successfull" }
    } catch (error) {
        return { error: error }
    }
}


export const getInfo = async () => {
    const USER_ID = localStorage.getItem("gmrauthid")
    try {
        const doc = await appwritesdk.database.getDocument(process.env.REACT_APP_COLLECTION_ID, USER_ID)
        const { name, address, city, country } = doc
        return { data: { name, address, city, country } }
    } catch (error) {
        return { error: "User has no Info yet" }
    }
}

export const getReceipts = async (search, page) => {
    try {
        const limit = 5
        const list = await appwritesdk.storage.listFiles(process.env.REACT_APP_BUCKET_ID, search, limit, limit * page - limit, "", "", "DESC")
        const fileIds = []
        list.files.forEach(file => {
            fileIds.push({ id: file.$id, date: file.dateCreated, name: file.name.split("-")[0] })
        })
        return { files: fileIds.reverse(), total: Math.ceil(list.total / limit) }
    } catch (err) {
        throw new Error("An error occured")
    }
}

export const viewReceipt = async (id) => {
    try {
        const receipt = appwritesdk.storage.getFileView(process.env.REACT_APP_BUCKET_ID, id)
        return receipt.href
    } catch (err) {
        throw new Error("An error occured!")
    }
}

export const deleteReceipt = async (id) => {
    try {
        await appwritesdk.storage.deleteFile(process.env.REACT_APP_BUCKET_ID, id)
    } catch (err) {
        throw new Error("An error occured!")
    }
}