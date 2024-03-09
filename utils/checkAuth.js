import jwt from "jsonwebtoken";

export default async (req) => {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return null;

    let { _id, role } = jwt.verify(token, process.env.JWT_SECRET);
    return { _id, role };
  } catch (error) {
    return { _id: null, role: null };
  }
};
