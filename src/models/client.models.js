import mongoose, { Schema } from "mongoose";

const clientSchema = new Schema(
    {
        name : {
            type : String,
            required : true,
        },
        email : {
            type : String,
            required : true,
            unique : true,
            index : true,
        },
        phone : {
            type : Number,
            required : true
        },
        prefrence : {
            type : String,
        }
    }
);

export const Client = mongoose.model("Client", clientSchema);