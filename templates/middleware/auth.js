const jwtService = require("../service/jwt");

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Authorization header missing",
        });
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
        return res.status(401).json({
            message: "Invalid authorization format",
        });
    }

    try {
        const decoded = jwtService.verifyToken(token);

        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
}

module.exports = authMiddleware;