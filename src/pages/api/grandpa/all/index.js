import { verifyAccessToken } from "../../../../../helper/authMiddleware.js";
import Grandpa from "../../../../../models/grandpa/index.js";

export default async function handler(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = verifyAccessToken(token);

    // console.log("decoded: ", decoded);
    if (Object.keys(decoded).length > 0) {
      const allGrandpas = await Grandpa.find();

      if (allGrandpas) {
        res.status(200).json({
          data: allGrandpas,
          success: true,
        });
      } else {
        res.status(409).json({
          message: "Getting granpdas failed!",
          success: false,
        });
      }
    } else {
      res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }
  } catch (error) {
    res.status(409).json({
      message: error.message,
      success: false,
    });
  }
}
