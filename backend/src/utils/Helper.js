const jwt = require("jsonwebtoken");


function validateFields(fields) {
    for (const [field, value] of Object.entries(fields)) {
        if (!value) {
            throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required.`);
        }
    }
}


function verifyToken(req) {
    const authorizationHeader = req.get("authorization");
    if (!authorizationHeader) {
        return
    }
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
        return
    }
    let decodedToken = "";
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET || "secret");
    } catch (error) {
        return error
    }
    if (!decodedToken) {
        return
    }
    return decodedToken;
}

module.exports = {
    validateFields,
    verifyToken
};

