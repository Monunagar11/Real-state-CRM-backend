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
            required : true
        },
        images : [
            {
                type : String,
            }
        ],
        agentId : Schema.Types.ObjectId,
        ref : "User"
    },
    {
        timestamps : true
    }
);

export const Property = mongoose.model("Property", propertySchema);