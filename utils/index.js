const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken")


const hashString = async (useValue) => {
    const salt = await bcrypt.genSalt(10);

    const hashedpassword = await bcrypt.hash(useValue, salt);
    return hashedpassword;
};

const compareString = async (userPassword, password) => {
    const isMatch = await bcrypt.compare(userPassword, password);
    return isMatch;
};

//JSON WEBTOKEN
function createJWT(id) {
    return JWT.sign({ userId: id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
    });
}

module.exports = { hashString, compareString, createJWT };
