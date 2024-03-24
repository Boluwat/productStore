import { Model, Schema, model } from "mongoose";
import { IUserDocument } from "../../interfaces/user-model";

const userSchema = new Schema<IUserDocument>(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    mobile: {
      type: String,
    },
  },
  {
    strict: "throw",
    timestamps: true,
  }
);

interface IUserModel extends Model<IUserDocument> {}
const User = model<IUserDocument, IUserModel>("User", userSchema);

export default User;
