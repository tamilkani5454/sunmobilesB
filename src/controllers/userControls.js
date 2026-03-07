import bcrypt from "bcrypt"
import users from "../modules/users.js"
import jwt from "jsonwebtoken"

export const signUp = async (req, res) => {
    const { firstName, lastName, phoneNumber, email, password } = req.body

    try {
        const exitUser = await users.findOne({ $or: [{ email }, { phoneNumber }] })
        if (exitUser) {
            const errors = {}
            if (exitUser.email === email) {
                errors.email = "email alredy exits"
            }
            if (exitUser.phoneNumber == phoneNumber) {
                errors.phoneNumber = "phone number alredy exits"
            }

            return res.status(400).json({ message: "user alredy exits", errors });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new users({
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            email: email,
            password: hashedPassword
        })
        await user.save()
        const token = jwt.sign({ phoneNumber: user.phoneNumber, id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.json({ success: true, message: "user regiter successfully", token })

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const exitUser = await users.findOne({ email: email })

        if (!exitUser) {

            return res.json({ success: false, message: "user not found" })
        }
        const encrypt = await bcrypt.compare(password, exitUser.password)
        console.log(encrypt)
        if (!encrypt) {

            return res.json({ success: false, message: "incorrect password" })
        }

        const token = jwt.sign({ phoneNumber: exitUser.phoneNumber, id: exitUser._id, role: exitUser.role }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.status(200).json({ success: true, message: "login success", token })
    } catch (error) {
        res.send(error)
    }
}
export const adminLogin = async (req, res) => {

    const { email, password } = req.body
    try {
        const admin = await users.findOne({ email: email })

        if (!admin) {
            return res.json({ success: false, message: "user Not Found" })
        }
        if (admin.role !== "admin") {
            return res.json({ success: false, message: "Access Dennied" })
        }
        const encryptPass = await bcrypt.compare(password, admin.password)
        if (!encryptPass) {
            return res.json({ success: false, message: "incorrect password" })
        }
        const token = jwt.sign({ phoneNumber: admin.phoneNumber, id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.status(200).json({ success: true, message: "login success", token })
    } catch (error) {
        res.json(error)
    }

}
