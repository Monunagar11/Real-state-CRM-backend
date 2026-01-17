import mongoose, { Schema } from "mongoose";

const leadSchema = new Schema(
    {
        clientId : {
            type : Schema.Types.ObjectId,
            ref : "Client"
        },
        
        source : {
            type : String
        },
        status : {
            type : String,
            required : true
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