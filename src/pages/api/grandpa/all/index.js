import Grandpa from "../../../../../models/grandpa/index.js";

export default async function handler(req, res) {
  try {
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
  } catch (error) {
    res.status(409).json({
      message: error.message,
      success: false,
    });
  }
}
