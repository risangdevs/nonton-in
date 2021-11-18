const bcrypt = require('bcrypt');
const sessions = require("express-session");
const { User } = require("../models/");

class UserController {
    static getRegisterForm(req, res) {
        const { error } = req.query;
        res.render("auth/registerForm", { error, user: false });
    }

    static postRegisterForm(req, res) {
        const { userName, email, password } = req.body;
        const params = { userName, email, password };
        User.create(params)
            .then(() => res.redirect("/auth/login?message=success"))
            .catch((err) => res.redirect(`/auth/register?error=${err.message.split("\n").map((el) => el.replace("Validation error: ", "")).join(".")}`));
    }

    static getLoginForm(req, res) {
        const { message, error } = req.query;
        res.render("auth/loginForm", { message, error, user: false });
    }

    static postLoginForm(req, res) {
        const { userName, password } = req.body;
        const params = { userName };
        User.findOne({ where: params })
            .then((data) => {
                if (!bcrypt.compareSync(password, data.password)) res.redirect(`/auth/login?error=userName or password was incorrect`);
                else {
                    let session = req.session;
                    const { id, userName, role } = data;
                    session.user = { id, userName, role };
                    res.redirect("/");
                }
            })
            .catch((err) => res.redirect(`/auth/login?error=userName or password was incorrect`));
    }

    static logout(req, res) {
        req.session.destroy((err) => {
            if (err) res.send("error");
            else res.redirect("/");
        });
    }
}

module.exports = UserController;
