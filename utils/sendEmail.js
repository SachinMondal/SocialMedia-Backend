const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
const { v4: uuidv4 } = require("uuid");

dotenv.config();

const { AUTH_EMAIL, AUTH_PASSWORD, APP_URL } = process.env;

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587, // Update the port if necessary
    secure: false, // Use TLS
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASSWORD,
    },
});

const sendVerificationEmail = async (user, res) => {
    const { _id, email, lastName } = user;

    const token = _id + uuidv4();
    const link = `${APP_URL}users/verify/${_id}/${token}`;

    const mailOptions = {
        from: AUTH_EMAIL,
        to: email,
        subject: "Email Verification",
        html: `
            <div style="font-family: Arial, sans-serif; font-size: 20px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px;">
                <h3 style="color: rgb(8, 56, 188)">Please verify your email address</h3>
                <hr>
                <h4>Hi ${lastName},</h4>
                <p>
                    Please verify your email address so we can know that it's really you.
                    <br>
                    <p>This link <b>expires in 1 hour</b></p>
                    <br>
                    <a href="${link}" style="color: #fff; padding: 14px; text-decoration: none; background-color: #000;  border-radius: 8px; font-size: 18px;">Verify Email Address</a>
                </p>
                <div style="margin-top: 20px;">
                    <h5>Best Regards</h5>
                    <h5>ShareFun Team</h5>
                </div>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(201).send({
            success: "PENDING",
            message: "Verification email has been sent to your account. Check your email for further instructions.",
        });
    } catch (error) {
        console.error("Error sending verification email:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const resetPasswordLink = async (user, res) => {
    const { _id, email } = user;

    const token = _id + uuidv4();
    const link = `${APP_URL}users/reset-password/${_id}/${token}`;

    const mailOptions = {
        from: AUTH_EMAIL,
        to: email,
        subject: "Password Reset",
        html: `
            <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px;">
                Password reset link. Please click the link below to reset your password.
                <br>
                <p style="font-size: 18px;"><b>This link expires in 10 minutes</b></p>
                <br>
                <a href="${link}" style="color: #fff; padding: 10px; text-decoration: none; background-color: #000;  border-radius: 8px; font-size: 18px;">Reset Password</a>.
            </p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(201).send({
            success: "PENDING",
            message: "Reset Password Link has been sent to your account.",
        });
    } catch (error) {
        console.error("Error sending password reset email:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { sendVerificationEmail, resetPasswordLink };