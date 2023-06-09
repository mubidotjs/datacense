import { verifyAccessToken } from "../../../../helper/authMiddleware.js";
import Grandpa from "../../../../models/grandpa/index.js";

export default async function handler(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = verifyAccessToken(token);

    // console.log("decoded: ", decoded);
    if (Object.keys(decoded).length > 0) {
      const { id, name, age, veteran } = req.body;
      if (!id) {
        res.status(409).json({
          message: "id field is required",
          success: false,
        });
      } else if (!name) {
        res.status(409).json({
          message: "Name field is required",
          success: false,
        });
      } else if (!age) {
        res.status(409).json({
          message: "Age field is required",
          success: false,
        });
      } else if (!veteran) {
        res.status(409).json({
          message: "Veteran field is required",
          success: false,
        });
      } else {
        const intId = Number(id);
        //   console.log("intId: ", intId);
        const existingGranpda = await Grandpa.findOne({ id: intId });

        if (existingGranpda) {
          return res.status(409).send({
            message: "Grandpa already exist!",
            success: false,
          });
        } else {
          const grandpa = await Grandpa.create({
            ...req.body,
            id: intId,
            name,
            age,
            veteran,
          });

          if (grandpa) {
            res.status(201).json({
              message: "Granpda added successfully",
              data: {
                id: grandpa.id,
                name: grandpa.name,
                age: grandpa.age,
                veteran: grandpa.veteran,
              },
              success: true,
            });
          } else {
            res.status(409).json({
              message: "Adding granpda failed!",
              success: false,
            });
          }
        }
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
