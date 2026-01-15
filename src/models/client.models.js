import mongoose, { Schema } from "mongoose";

const clientSchema = new Schema(
    {
        leadId : {
            type : Schema.Types.ObjectId,
            ref : "Lead"
        },
        propertyId : {
            type : Schema.Types.ObjectId,
            ref : "Property"
        },
        agentId : {
            type : Schema.Types.ObjectId,
            ref : "User",
        },
        status : {
            type : String,
            required : true
        },
        amount : {
            type : Number,
            required : true
        }
    }
);

export const Client = mongoose.model("Clent", clientSchema);