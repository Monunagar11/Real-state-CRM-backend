import mongoose, { Schema } from "mongoose";

const followUpSchema = new Schema(
    {
        leadId : {
            type : Schema.Types.ObjectId,
            ref : "Lead"
        },
        note : {
            type : String,
            required : true
        },
        reminder : {
            type : Boolean,
            required : true
        }
    }
);

export const FollowUp = mongoose.model("FollowUp", followUpSchema);