import mongoose, { Schema } from "mongoose";

const dealSchema = new Schema(
    {
        leadId : {
            type : Schema.Types.ObjectId,
            ref : "Lead"
        },
        propertyId : {
            type : Schema.Types.ObjectId,
            ref : "Property"
        },
        status : {
            type : String,
            required : true,
        }
    }
);

export const Deal = mongoose.model("Deal", dealSchema);