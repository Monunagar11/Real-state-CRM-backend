import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave:false});

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Error in generating refresh and access token");
    }

}

const registerUser = asyncHandler( async(req, res)=>{
    const { username, email, password, phone } = req.body;

    if(
        [ username, email, password].some((field)=> field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    };

    const existedUser = await User.findOne(
        {
            $or : [{ username }, { email }]
        }
    );
    if(existedUser) {
        throw new ApiError(400, "User already existed");
    }

    const user = await User.create(
        {
            username,
            email,
            password,
            phone
        }
    )

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500, "Something went wrong");
    }

    return res
        .status(201)
        .json(new ApiResponse(
            200,
            createdUser,
            "User created successfully"
        ))
})

const loginUser = asyncHandler( async(req,res) => {
    const { email, password } = req.body;

    if( !email ){
        throw new ApiError(400, "Email address required")
    };

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(404, "User not found");
    }
    if(!password){
        throw new ApiError(400, "Password required")
    }

    const isPasswordValidate = await user.isPasswordCorrect(password);

    if(!isPasswordValidate){
        throw new ApiError(401, "Password incorrect")
    };

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    const logInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        data : logInUser, refreshToken, accessToken
                    },
                    "user loggedIn successfully"
                )
            )
});

const logOutUser = asyncHandler(async(req,res) => {
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset : {
                refreshToken : 1
            }
        },
        {
            new : true
        }
    );

    const options = {
        httpOnly : true,
        secure : true
    };

    return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json( new ApiResponse(
                200,
                {},
                "User logged Out successfully"
            ))
})

export {
    registerUser,
    loginUser,
    logOutUser

}