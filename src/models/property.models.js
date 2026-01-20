import mongoose, { Schema } from "mongoose";

const propertySchema = new Schema(
    {
        title : {
            type : String,
            required : true
        },
        location : {
            type : String,
            required : true
        },
        price : {
            type : Number,
            required : true
        },
        type : {
            type : String,
            required : true
        },
        area : {
            type : Number,
            required : true
        },
        status : {
            type : String,
            required : true,
            enum : ["DRAFT", "AVAILABLE", "INQUIRY_RECEIVED", "SITE_VISIT_SCHEDULED", "NEGOTIATION", 
                    "BOOKED", "SOLD", "LEASED", "ON_HOLD", "CANCELLED"],
            default : "DRAFT"
        },
        images : [
            {
                type : String,
            }
        ]
    },
    {
        timestamps : true
    }
);

export const Property = mongoose.model("Property", propertySchema);