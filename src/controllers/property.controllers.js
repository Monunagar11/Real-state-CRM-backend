import { Property } from "../models/property.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadFilesOnCloud, uploadOnCloudinary } from "../utils/cloudinary.js";

// post
const addNewProperty = asyncHandler( async(req, res) => {
    const { title, location, type, area, price, status} = req.body;

    if ([title, location, type, area, price, status].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required");
    }
    const imgUrls = req.files.propertyImages.map((img)=>img.path);
    if( !imgUrls ){
        throw new ApiError(400, "Files required");
    }

    const response = await uploadFilesOnCloud(imgUrls);
    
    if( !response ){
        throw new ApiError(500, "Something went wrong while uploading file")
    }

    const property = await Property.create({
        title,
        type,
        location,
        price,
        area,
        status,
        images : response
    });

    if(!property){
        throw new ApiError(500, "Something went wrong while creating property in db")
    }

    return res
            .status(201)
            .json(new ApiResponse(
                201,
                property,
                "Property created successfully"
            ));
});

// put 
const updateProperty = asyncHandler( async(req, res) => {
    return res.json(new ApiResponse(200,"property updateProperty"))
});

// get 
const getPropertyById = asyncHandler( async(req, res) => {
    const id = req.params.id;
    if( !id ){
        throw new ApiError(400, "Property id requried");
    }

    const property = await Property.findById({ _id : id});

    if(!property){
        throw new ApiError(404, "Property not found");
    }
    return res
            .status(200)
            .json(new ApiResponse(
                200,
                property,
                "Property found successfully"
            ))
});

// get
const getAllProperties = asyncHandler( async(req, res) => {
    const properties = await Property.find();
    if(!properties){
        throw new ApiError(404, "no property found");
    };
    return res
            .status(200)
            .json(new ApiResponse(200,properties,"property details"));
});

// delete
const deletePropertyById = asyncHandler( async(req, res) => {
    const id = req.params.id;
    if(!id){
        throw new ApiError(400, "Id required to delete the property")
    };
    try {
        const result = await Property.deleteOne({ _id : id});
        if( result.deletedCount === 1){
            return res 
                    .status(200)
                    .json(new ApiResponse(
                        200,
                        "Property deleted successfully"
                    ))
        } else {
            return res 
                    .status(404)
                    .json(new ApiResponse(
                        404,
                         "Property not found"
                    ))
        }
    } catch (error) {
        console.log("Error while deleting the property")
        return res
                .status(500)
                .json(new ApiResponse(
                    500,
                    error,
                    "Server error while deleting the Property"
                ));
    }
});

// update 
const updatePropertyStatus = asyncHandler( async(req, res) => {
    const id = req.params.id;
    if(!id){
        throw new ApiError(400, "Id required to update the status");
    };
    const {status} = req.body;
    if(!status){
        throw new ApiError(400, "Status required to update the status of the property");
    }

    const property = await Property.findByIdAndUpdate({_id:id},
        {
            $set : {
                status
            }
        },{
            new : true
        }
    )

    if(!property){
        throw new ApiError(404, "Something went wrong while updating the status")
    }

    return res
            .status(200)
            .json( new ApiResponse(
                200,
                property,
                "Property status updated successfully"
            ))
});

// get
// const getPropertyByAgentId = asyncHandler( async(req, res) => {
//     return res.json(new ApiResponse(200,"property updatePropertyStatus"))
// });

// get
// const searchProperties = asyncHandler( async(req, res) => {
//     return res.json(new ApiResponse(200,"property updatePropertyStatus"))
// });



export {
    getAllProperties,
    getPropertyById,
    addNewProperty,
    updateProperty,
    deletePropertyById,
    updatePropertyStatus
}