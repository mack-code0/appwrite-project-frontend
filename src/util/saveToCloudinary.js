import cloudinary from 'cloudinary'

const saveImage = (imageInfo)=>{
    cloudinary.v2.config({
        cloud_name: "macauzu",
        api_key: "128966232545662",
        api_secret: "Uv8pt-hDyReG8UUAK8FW_i4eSQ8",
        secure: true
    });
    cloudinary.v2.uploader.upload(`${imageInfo}`,
            {
                folder: "NewLiquorStore/images",
                use_filename: true,
                unique_filename: true
            },
            (err, result) => {
                if (err) {
                    return err
                }
    
                console.log(result);
            })
}

export default saveImage