import { model, Schema } from "mongoose";

 const dailylogschema = new Schema(
   {
     date: {
       type: String,
       required: true,
       unique: true,
       index: true,
     },
     title: {
       type: String,
       required: true,
       trim: true,
       maxlength: 150,
       default: "Untitled.",
     },
     content: {
       type: String,
       required: true,
     },
   },
   {
     timestamps: true,
   },
 );
 export const DailyLog = model("DailyLog",dailylogschema)