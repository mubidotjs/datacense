import Register from "../../../../models/register/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      res.status(409).json({
        message: "Email field is required",
        success: false,
      });
    } else if (!password) {
      res.status(409).json({
        message: "Password field is required",
        success: false,
      });
    } else {
      const oldUser = await Register.findOne({ email });

      if (oldUser) {
        return res.status(409).send({
          emailErr:
            "User already exist with this email, please login to continue!",
          success: false,
        });
      }

      //Encrypt user password
      let encryptedPassword;

      if (password) {
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create token and store token in user array
        const token = jwt.sign(
          { email: email },
          "mongodbexpresjsnodejsreactjsiemernstackdeveloper"
        );

        const user = await Register.create({
          ...req.body,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
          token: token,
        });

        if (user) {
          res.status(201).json({
            message: "User created successfully",
            data: {
              userId: user._id,
              username: user.username,
              email: user.email,
              token: user.token,
            },
            success: true,
          });
        } else {
          res.status(409).json({
            message: "Registration failed!",
            success: false,
          });
        }
      }
    }
  } catch (error) {
    res.status(409).json({
      message: error.message,
      success: false,
    });
  }
}
