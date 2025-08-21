import jwt from "jsonwebtoken";

// import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// export const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ msg: "No token provided" });

//   const token = authHeader.split(" ")[1]; // Bearer <token>
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; 
//     next();
//   } catch (err) {
//     return res.status(401).json({ msg: "Invalid token" });
//   }
// };


export const checkSuperAdmin = (req, res, next) => {
  if (!req.user ||!req.user.superadmin) {
    return res.status(403).json({ msg: "Access denied: SuperAdmin only" });
  }
  next();
};
