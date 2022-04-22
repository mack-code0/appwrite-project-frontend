import {Appwrite} from "appwrite"

const sdk = new Appwrite();

sdk
    .setEndpoint('http://localhost:50/v1') // Your API Endpoint
    .setProject('6256fbc40d114472489f') // Your project ID
;

export default sdk.account