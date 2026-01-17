import { v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name : "dnm5siaq8",
    api_key : '278543464267282',
    api_secret :'lhRBKyQSQXNwa_6Isrw1P1SNb0I'
})

const uploadOnCloudinary = async (localPath) => {
    try {
        if(!localPath) return null;
        const response = await cloudinary.uploader.upload(localPath, { resource_type : "auto"});
        console.log("file uploaded successfully");
        fs.unlinkSync(localPath);
        return response.url;

    } catch (error) {
        fs.unlinkSync(localPath);
        console.log("Error while uploading file "+error);
        throw new Error("Error while uploading file");
    }
}

const uploadFilesOnCloud = async (localPaths) => {
    try {
        if(!localPaths) return null;

        const securePromise = localPaths.map(async(url)=>await uploadOnCloudinary(url));
        const secureUrl = await Promise.all(securePromise);
        return secureUrl;
        
    } catch (error) {
        console.log("Batch file upload error")
        return null;
    }
}

export {
    uploadOnCloudinary,
    uploadFilesOnCloud
}