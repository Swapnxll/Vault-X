import jwt from "jsonwebtoken";
const JWT_SECRET = "dshfbnjfbnd";
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);
    //console.log(decoded.id);
    // Pass along the user info to downstream services
    req.headers["x-user-id"] = decoded.id;
    //req.headers["x-user-role"] = decoded.role;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
