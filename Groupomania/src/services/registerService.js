import DBConnection from "./../configs/DBConnection";
import bcrypt from "bcryptjs";

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        // check email is exist or not
        let isEmailExist = await checkExistEmail(data.u_email);
        if (isEmailExist) {
            reject(`This email "${data.u_email}" has already exist. Please choose an other email`);
        } else {
            // hash password
            let salt = bcrypt.genSaltSync(10);
            let userItem = {
                u_pseudo: data.u_pseudo,
                u_email: data.u_email,
                u_pwd: bcrypt.hashSync(data.u_pwd, salt),
            };

            //create a new account
            DBConnection.query(
                ' INSERT INTO usagers set ? ', userItem,
                function(err, rows) {
                    if (err) {
                        reject(false)
                    }
                    resolve("Create a new user successful");
                }
            );
        }
    });
};

let checkExistEmail = (u_email) => {
    return new Promise( (resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT * FROM `usagers` WHERE `u_email` = ?  ', u_email,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    if (rows.length > 0) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};
module.exports = {
    createNewUser: createNewUser
};
