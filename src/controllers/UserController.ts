import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../models/User";

/* Create Controller to Saved User Info */
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, gender, phone, username, createdAt } =
    req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const isHasAlready = await User.findOne({ username, email });
  if (isHasAlready) {
    return res.status(400).send({ message: "User Already Exists" });
  }
  const createUser = await User.create({
    name,
    email,
    phone,
    gender,
    username,
    password: hashedPassword,
    createdAt,
  });
  try {
    return res.status(201).send({ success: true, user: createUser });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Couldn't create the user" });
  }
};

/* for get all the users */
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  try {
    return res.status(200).send({ users });
  } catch (err) {
    return res
      .status(500)
      .send({ success: false, message: "Couldn't get the users" });
  }
};
