import mongoose, { Schema } from "mongoose";

const leadSchema = new Schema(
    {
        clientId : {
            type : Schema.Types.ObjectId,
            ref : "Client"
        },
        agentId : {
            type : Schema.Types.ObjectId,
            ref : "User"
        },
        source : {
            type : String
        },
        status : {
            type : String
        },
        budget : {
            type : Number
        },
        priority : {
            type : String
        }

    }
);

export const Lead = mongoose.model("Lead", leadSchema);