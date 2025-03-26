const { getUserByEmail, createUser } = require("../services/users.services");
const bcrypt = require("bcrypt");
const { validateFields } = require("../utils/Helper");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // validation for input fields
        validateFields({ username, password, email });

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists. Please sign in.", data: [], success: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser({ username, email, password: hashedPassword });
        return res.status(200).json({ message: "User registered successfully.", data: [], success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message, data: [], success: false });
    }
};

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation for input fields
        validateFields({ email, password });

        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "User not found. Please sign up.", data: [], success: false });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Email or Password", data: [], success: false });
        }
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).json({ message: "User logged in successfully.", data: [], token, success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error", data: [], success: false });
    }
}