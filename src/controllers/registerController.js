import registerService from "./../services/registerService";
import { validationResult } from "express-validator";

let getPageRegister = (req, res) => {
    return res.render("register.ejs", {
        errors: req.flash("errors")
    });
}; //END FUNCTION getPageRegister

let createNewUser = async (req, res) => {
    //validate required fields
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        }); //END FUNCTION errors
        req.flash("errors", errorsArr);
        return res.redirect("/register");
    } //END FUNCTION validationErrors

    //create a new user
    let newUser = {
        u_pseudo: req.body.u_pseudo,
        u_email: req.body.u_email,
        u_pwd: req.body.u_pwd
    }; //END newUser
    try {
        await registerService.createNewUser(newUser);
        return res.redirect("/login");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/register");
    }
};//END FUNCTION createNewUser
module.exports = {
    getPageRegister: getPageRegister,
    createNewUser: createNewUser
};
