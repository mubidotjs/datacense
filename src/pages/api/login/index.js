import Register from "../../../../models/register/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
  path: "../../../../.env",
});

export default async function handler(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Validate user input
    if (!(email && password)) {
      res
        .status(409)
        .send({ message: "All inputs are required", success: false });
    }

    // console.log(`Email is ${email} and password is ${password}`);
    const user = await Register.findOne({
      email: email,
    });

    // console.log(user);
    if (!user) {
      res.status(409).send({ message: "Invalid Credentials", success: false });
    } else if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ email: email }, process.env.JWT_SECRET);

      // save user token
      user.token = token;
      await user.save();

      // res.status(200).json(token);
      // console.log("user : ", user);
      res.status(200).json({
        data: {
          userId: user._id,
          email: user.email,
          token: user.token,
        },
        success: true,
      });
    } else {
      res.status(400).send({ message: "Invalid Credentials", success: false });
    }
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
}
