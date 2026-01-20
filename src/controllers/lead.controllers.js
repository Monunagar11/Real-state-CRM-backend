import { Lead } from "../models/lead.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Client } from "../models/client.models.js";

const createLead = asyncHandler(async (req, res) => {
  const { clientId, source, status, budget, priority } = req.body;

  if (
    [clientId, source, status, priority].some((field) => field?.trim() == "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const client = await Client.findById(clientId );
  if (!client) {
    throw new ApiError(404, "Cleint not exists");
  }

//   const lead = await Lead.findOne({clientId});
//   if (lead) {
//     throw new ApiError(409, "lead already exists");
//   }

  const createlead = await Lead.create({
    clientId,
    source,
    status,
    budget,
    priority,
  });

  if (!createlead) {
    throw new ApiError(500, "something went wrong while creating lead");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createlead, "Client created successfully"));
});

const getAllLeads = asyncHandler(async (req, res) => {
  const leads = await Lead.find();
  if (!leads) {
    throw new ApiError(400, "Something went wrong while fetching leads");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, leads, "leads fetched successfully"));
});

const getLeadById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(400, "Lead id requried");
  }

  const lead = await Lead.findById({ _id: id });

  if (!lead) {
    throw new ApiError(404, "Lead not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, lead, "Lead fetched successfully"));
});

const updateLeadById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(400, "Lead id required");
  }

  const { status, budget, priority } = req.body;
  if ([status, priority].some((field) => field?.trim() == "")) {
    throw new ApiError(400, "All fields are required");
  }

  const updatedLead = await Lead.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        status,
        budget,
        priority,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedLead, "Lead updated successfully"));
});

const deleteLeadById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(400, "Lead id required");
  }
  try {
    const result = await Lead.findByIdAndDelete({ _id: id });
    if (result.deleted === 1) {
      return res.status(200).json(new ApiResponse(200, "ALL leads"));
    } else {
      return res
        .status(500)
        .json(
          new ApiResponse(500, "Something went wrong while deleting the lead")
        );
    }
  } catch (error) {
    console.log("Something went wrong while deleting lead");
    throw new ApiError(500, "Server error while deleting lead");
  }
});

const updateLeadStatus = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(400, "Lead id required");
  }

  const { status, budget, priority } = req.body;
  if (!status) {
    throw new ApiError(400, "Status filed is required");
  }

  const updatedLead = await Lead.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        status
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedLead, "Lead updated successfully"));
});

const getLeadsStatsConversion = asyncHandler(async (req, res) => {
    const leads = await Lead.aggregate([
        {
            $group : {
                _id : "$status",
                count : {$sum : 1}
            }
        }
    ])
  return res.status(200).json(new ApiResponse(200,
    leads,
    "Leads conversion"));
});

export {
  createLead,
  getLeadById,
  getAllLeads,
  updateLeadById,
  updateLeadStatus,
  deleteLeadById,
  getLeadsStatsConversion,
};
