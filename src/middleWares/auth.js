import users from "../modules/users.js";
import jwt from "jsonwebtoken"


export const verifyUser = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) return res.status(401).json({ msg: "No token" });
        const token = authHeader.split(" ")[1]; // Bearer <token>

        if (!token) return res.status(401).json({ success: false, message: "Not authorized" });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await users({ email: decoded.email });

        if (!user) return res.status(401).json({ success: false, message: "Not authorized" });
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid token" });
        console.log(error)
    }

}
export const checkUser = async (req, res) => {
    res.json({ success: true, user: { email: req.user.email }, message: "login success" });
};
export const verifyAdmin = async (req, res, next) => {

    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) return res.status(401).json({ msg: "No token" });
        const token = authHeader.split(" ")[1]; // Bearer <token>

        if (!token) return res.status(401).json({ success: false, message: "Not authorized" });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const adminExists = await users.findById(decoded.id);
        if (!adminExists || adminExists.role !== "admin") return res.status(401).json({ success: false, message: "Not authorized" });
        req.admin = adminExists;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};
export const checkAdmin = async (req, res) => {
    res.json({ success: true, admin: { id: req.admin._id }, message: "Admin login success" });
};