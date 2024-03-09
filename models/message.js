import { USER_ROLES } from "@/constants/userRoles";
import { Schema, model, models } from "mongoose";
import Document from "./document";

const { String, Number, Boolean, ObjectId } = Schema.Types;
Document;

const messageSchema = new Schema(
  {
    sender: {
      type: String,
      required: true,
      enum: [USER_ROLES.client, USER_ROLES.serviceProvider],
    },
    content: { type: String },
    document: { type: ObjectId, ref: "Document" },
    time: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Message = models.Message || model("Message", messageSchema);

export default Message;
