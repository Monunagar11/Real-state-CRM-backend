import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Client } from "../models/client.models.js";

const createClient = asyncHandler(async (req, res) => {
  const { name, email, phone, prefrence } = req.body;

  if ([name, email, phone, prefrence].some((field) => field.trim() == "")) {
    throw new ApiError(400, "All fields are required");
  }

  const client = await Client.findOne({ email });
  if (client) {
    throw new ApiError(409, "Client already exists");
  }

  const createClient = await Client.create({
    name,
    email,
    phone,
    prefrence,
  });

  if (!createClient) {
    throw new ApiError(500, "something went wrong while creating Client");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createClient, "Client created successfully"));
});

const getClientById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new ApiError(400, "id required");
    }

    const client = await Client.findOne({ _id: id });
    if (!client) {
      throw new ApiError(400, "Client not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, client, "Client data fetched successfully"));
  } catch (error) {
    console.log("Something went wrong" + error);
    throw new ApiError(500, "Server error while fetching client");
  }
});

const updateClient = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(400, "Id required to update the client");
  }
  const { name, email, phone, prefrence } = req.body;
  if ([name, email, phone, prefrence].some((field) => field.trim() == "")) {
    throw new ApiError(400, "All fields are required");
  }

  const client = await Property.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        name,
        email,
        phone,
        prefrence,
      },
    },
    {
      new: true,
    }
  );

  if (!client) {
    throw new ApiError(
      404,
      "Something went wrong while updating the client data"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, client, "Property status updated successfully"));
});

const deleteClient = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(400, "Id required to delete the clinet");
  }
  try {
    const result = await Client.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      return res
        .status(200)
        .json(new ApiResponse(200, "Client deleted successfully"));
    } else {
      return res.status(404).json(new ApiResponse(404, "Client not found"));
    }
  } catch (error) {
    console.log("Error while deleting the client");
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "Server error while deleting the client")
      );
  }
});

const getAllClients = asyncHandler(async (req, res) => {
  const clients = await Client.find();
  if (!clients) {
    throw new ApiError(400, "No client found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, clients, "Clients data fetched successfully"));
});

const getClientHistory = asyncHandler(async (req, res) => {
  return res.json("client history");
});

export {
  createClient,
  getClientById,
  getAllClients,
  updateClient,
  deleteClient,
  getClientHistory,
};
