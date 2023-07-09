import UsersModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const existinguser = await UsersModel.findOne({
      email: req.body.email,
    });

    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: "User Already Exists",
      });
    }

    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashPassword;

    const user = new UsersModel(req.body);
    await user.save();
    return res.status(201).send({
      success: true,
      message: "User Registered Successfuly",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const user = await UsersModel.find({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid credentials",
      });
    } else if (user.role !== req.body.role) {
      return res.status(500).send({
        success: false,
        message: "Role does not matched",
      });
    } else {
      const comparePassoword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (comparePassoword) {
        const token = jwt.sign(
          { userId: user[0]._id },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        return res.status(200).send({
          success: true,
          message: "Login Successfull",
          token,
          user,
        });
      } else {
        return res.status(500).send({
          success: false,
          message: "Invalid credentials",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login Api",
      error,
    });
  }
};

export const getCurrentUserController = async (req, res) => {
  try {
    const user = await UsersModel.findOne({ _id: req.body.userId });
    return res.status(200).send({
      success: true,
      message: "User fetched successfuly",
      user,
    });
  } catch (error) {
    console.log("Error in Current user controller", error);
    return res.status(500).send({
      success: false,
      message: "Unable to get current user",
    });
  }
};
