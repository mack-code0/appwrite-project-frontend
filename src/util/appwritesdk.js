import {Appwrite} from "appwrite"

const sdk = new Appwrite();

sdk
    .setEndpoint('http://localhost:50/v1') // Your API Endpoint
    .setProject('625ac97006dc2d58b12c') // Your project ID
;

export default sdk