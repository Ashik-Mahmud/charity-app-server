import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

/* Create Controller to Saved User Info */
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, gender, phone, username, createdAt } =
    req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const isHasAlready = await User.findOne({ username });
  if (isHasAlready) {
    return res
      .status(400)
      .send({ message: ` ${username} named User Already Exists ` });
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

  if (createUser) {
    return res.status(201).send({
      success: true,
      message: "Registered User successfully done.",
      user: createUser,
    });
  } else {
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

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const isHas = await User.findOne({ username });
  if (isHas) {
    const isValid = await bcrypt.compare(password, isHas.password);
    if (isValid) {
      const token = jwt.sign(
        { username: username },
        process.env.ACCESS_TOKEN!,
        {
          expiresIn: "1d",
        }
      );
      isHas.password = "encrypted";
      res.send({
        success: true,
        username,
        token,
        user: isHas,
      });
    } else {
      return res
        .status(500)
        .send({ success: false, message: "Password is wrong." });
    }
  } else {
    return res
      .status(500)
      .send({ success: false, message: "Username is not registered." });
  }
  /*  const checkPassword = await bcrypt.compare(password, existUser.password); */
};
