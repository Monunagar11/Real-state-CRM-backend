import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createLead = asyncHandler ( async(req, res) => {

    return res.status(200).json(
        new ApiResponse(
            200,
            "create lead"
        )
    )
});

const getAllLeads = asyncHandler ( async(req, res) => {
    return res.status(200).json(
        new ApiResponse(
            200,
            "ALL leads"
        )
    )
});

const getLeadById = asyncHandler ( async(req, res) => {
    return res.status(200).json(
        new ApiResponse(
            200,
            "lead by id"
        )
    )
});


const updateLeadById = asyncHandler ( async(req, res) => {
    return res.status(200).json(
        new ApiResponse(
            200,
            "ALL leads"
        )
    )
});

const deleteLeadById = asyncHandler ( async(req, res) => {
    return res.status(200).json(
        new ApiResponse(
            200,
            "ALL leads"
        )
    )
});

const updateLeadStatus = asyncHandler ( async(req, res) => {
    return res.status(200).json(
        new ApiResponse(
            200,
            "ALL leads"
        )
    )
});

const getLeadsStatsConversion = asyncHandler ( async(req, res) => {
    return res.status(200).json(
        new ApiResponse(
            200,
            "ALL leads"
        )
    )
});


export {
    createLead,
    getLeadById,
    getAllLeads,
    updateLeadById,
    updateLeadStatus,
    deleteLeadById,
    getLeadsStatsConversion
}