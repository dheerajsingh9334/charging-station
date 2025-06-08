const User = require('../model/User')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
    console.log(req.body)
    const { email, password, name } = req.body;
    try {
       const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(400).json({ message: "User already exists" });
		}

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({
              success: true, 
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            
            message: "User created successfully",
        });
    } catch (error) {
        console.error("Error in signup controller", error.message);
        res.status(500).json({ message: error.message });
    }
};
const login = async (req, res) => {
	try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
         if (!user) return res.status(401).json({ message: "user doesnot Exist" });
          
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { userId: user._id ,role:user.role},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1d" }
            );
            res.cookie("accessToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            });
            res.status(201).json({
                token,
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                message: "Login successfully",
            });
            console.log(req.body);
            console.log("JWT SECRET:", process.env.ACCESS_TOKEN_SECRET);

            
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: error.message });
    }
};
const logout = async (req, res) => {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { signup ,login,logout};
