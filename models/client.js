import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { USER_ROLES } from "@/constants/userRoles";
import Chat from "./chat";

const { String, Number, Boolean, ObjectId } = Schema.Types;
Chat;

const clientSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, select: false },
    password: { type: String, required: true, select: false },
    chats: [{ type: ObjectId, ref: "Chat" }],
  },
  { versionKey: false }
);

clientSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

clientSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

clientSchema.methods.generateToken = function () {
  return jwt.sign(
    { _id: this._id, role: USER_ROLES.client },
    process.env.JWT_SECRET
  );
};

const Client = models.Client || model("Client", clientSchema);

export default Client;
