import DBConnection from "../configs/DBConnection";
import bcrypt from "bcryptjs";

let handleLogin = (u_email, u_pwd) => {
    return new Promise(async (resolve, reject) => {
        //check email is exist or not
        let user = await findUserByEmail(u_email);
        if (user) {
            //compare password
            await bcrypt.compare(u_pwd, user.u_pwd).then((isMatch) => {
                if (isMatch) {
                    resolve(true);
                } else {
                    reject(`The password that you've entered is incorrect`);
                } //END FUNCTION else
            });
        } else {
            reject(`This user email "${u_email}" doesn't exist`);
        } //END FUNCTION else
    });
};//END FUNCTION handleLogin


let findUserByEmail = (u_email) => {
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT * FROM `usagers` WHERE `u_email` = ? ', u_email,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    let user = rows[0];
                    resolve(user);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

let findUserById = (u_id) => {
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT * FROM `usagers` WHERE `u_id` = ?  ', u_id,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    let user = rows[0];
                    resolve(user);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

let comparePassword = (u_pwd, userObject) => {
    return new Promise(async (resolve, reject) => {
        try {
            await bcrypt.compare(u_pwd, userObject.u_pwd).then((isMatch) => {
                if (isMatch) {
                    resolve(true);
                } else {
                    resolve(`The password that you've entered is incorrect`);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    handleLogin: handleLogin,
    findUserByEmail: findUserByEmail,
    findUserById: findUserById,
    comparePassword: comparePassword
};