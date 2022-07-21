import { model, Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  phone?: string;
  gender?: string;
  username: string;
  password: string;
  createdAt: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  gender: { type: String, required: false },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: String, required: true },
});

export default model<IUser>("User", UserSchema);
