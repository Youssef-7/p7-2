import { check } from "express-validator";

let validateRegister = [
    check("u_email", "Invalid email").isEmail().trim(),

    check("u_pwd", "Invalid password. Password must be at least 2 chars long")
    .isLength({ min: 2 }),

    check("passwordConfirmation", "Password confirmation does not match password")
    .custom((value, { req }) => {
        return value === req.body.u_pwd
    })
];

let validateLogin = [
    check("u_email", "Invalid email").isEmail().trim(),

    check("u_pwd", "Invalid password")
    .not().isEmpty()
];

module.exports = {
    validateRegister: validateRegister,
    validateLogin: validateLogin
};
