import { Schema, model, models } from "mongoose";
import Message from "./message";

const { String, Number, Boolean, ObjectId } = Schema.Types;
Message;

const chatSchema = new Schema(
  {
    client: { type: ObjectId, ref: "Client", required: true },
    serviceProvider: { type: ObjectId, ref: "ServiceProvider", required: true },
    messages: [{ type: ObjectId, ref: "Message" }],
  },
  { versionKey: false }
);

const Chat = models.Chat || model("Chat", chatSchema);

export default Chat;
