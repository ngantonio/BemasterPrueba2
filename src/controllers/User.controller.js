import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import CONFIG from "../config/db.js";

const createToken = (user) => {
  return jwt.sign(
    { id: user._id, type: user.username, email: user.email },
    CONFIG.JWT_SECRET,
    {
      expiresIn: 86400,
    },
  );
};

export const addUser = async (req, res) => {
  try {
    const body = req?.body;

    const userExists_email = await User.findOne({ email: body?.email });
    const userExists_username = await User.findOne({
      username: body?.username,
    });
    //find({title: title, main_actor: main_actor, .....})
    if (userExists_email) {
      return res
        .status(400)
        .json({ msg: "There is a registered user with that email" });
    }

    if (userExists_username) {
      return res
        .status(400)
        .json({ msg: "There is a registered user with that username" });
    }

    const newUser = new User(body);

    await newUser.save();
    return res.status(201).json({ user: newUser, token: createToken(newUser) });
  } catch (error) {
    return res.status(500).json({ msg: "aqui", error });
  }
};

export const getUserByUsername = async (req, res) => {
  try {
    const username = req?.params?.username;

    const user = await User.findOne({ username });

    if (user) return res.status(201).json({ user });
    else return res.status(400).json({ msg: "User not found" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req?.params?.id;

    const user = await User.findOne({ _id: userId });

    if (user) return res.status(201).json({ user });
    else return res.status(400).json({ msg: "User not found" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const modifyUser = async (req, res) => {
  try {
    let body = req?.body;

    // Do not allow sensitive information to be modified
    delete body?.email;
    delete body?.username;
    delete body?.password;

    const userUpdated = await User.updateOne({ _id: body?.userId }, body);

    if (userUpdated.modifiedCount > 0)
      return res
        .status(201)
        .json({ ok: true, msg: "User updated successfully", userUpdated });
    return res.status(401).json({ msg: "User not found" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req?.body?.userId;
    const deleted = await User.deleteOne({ _id: userId });

    if (deleted)
      return res
        .status(201)
        .json({ ok: true, msg: "User deleted successfully" });
    else return res.status(401).json({ msg: "User not found" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
