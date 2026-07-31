const bcrypt = require("bcrypt");

const User = require("../models/User");
const jwtService = require("../services/jwt");

async function register(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email and password are required",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        const token = jwtService.generateToken({
            id: user._id,
        });

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Internal server error",
        });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const passwordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordValid) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = jwtService.generateToken({
            id: user._id,
        });

        res.json({
            message: "Login successful",
            token,
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Internal server error",
        });
    }
}

function logout(req, res) {
    // With JWT stored on the client, logout normally means
    // deleting the token on the client side.

    res.json({
        message: "Logout successful",
    });
}

module.exports = {
    register,
    login,
    logout,
};
