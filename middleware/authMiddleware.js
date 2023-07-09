import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        return res.status(401).send({
          success: false,
          message: "Auth failed",
        });
      } else {
        req.body.userId = decode.userId;
        console.log(req.body.userId);
        next();
      }
    });
  } catch (error) {
    console.log("Error in auth middleware", error);
    return res.status(401).send({
      success: false,
      message: "Auth Failed",
      error,
    });
  }
};
