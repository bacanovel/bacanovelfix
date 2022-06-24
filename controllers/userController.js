const { UserIdentity, User } = require('../models')
const bcrypt = require('bcryptjs')
const nodemailer = require("nodemailer");
class UserController {
    static home(req, res) {
        res.render('home');
    }
    static loginForm(req, res) {
        let errors = req.query.errors
        res.render('login', { errors })
    }
    static registerForm(req, res) {
        let errors = req.query.errors
        res.render('register', { errors })
    }
    static postRegister(req, res) {
        const { email, password, dateOfBirth, firstName, lastName, gender } = req.body
        User.create({
            email: email,
            password: password
        })
            .then(data => {
                return UserIdentity.create({
                    firstName,
                    lastName,
                    dateOfBirth,
                    gender,
                    UserId: data.id
                })
                    .then(data2 => {
                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'satyaaamanda@gmail.com',
                                pass: 'pbnemieskwwkdigs'
                            }
                        });

                        const mailOptions = {
                            from: 'satyaaamanda@gmail.com',
                            to: email,
                            subject: 'Register',
                            text: 'Register success!'
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent');
                            }
                        });
                        res.redirect('/login')
                    })
            })
            .catch(err => {
                console.log(err)
                let result = []
                if (err.name == "SequelizeValidationError") {
                    err.errors.forEach(x => {
                        result.push(x.message)
                    })
                    return res.redirect(`/register?errors=${result}`)
                }
            })
    }

    static cekLogin(req, res) {
        const { email, password } = req.body
        User.findOne({
            where: {
                email: email
            }
        })
            .then(user => {
                if (user) {
                    const isValidPassword = bcrypt.compareSync(password, user.password)
                    if (isValidPassword) {
                        // Case saat berhasil login
                        // console.log(req.session.iduser)
                        req.session.iduser = user.id //set session 
                        req.session.roleuser = user.role //set role
                        res.redirect('/novels')
                    } else {
                        // console.log(err)
                        let errors = 'Invalid username/password'
                        return res.redirect(`/login?errors=${errors}`)

                    }
                } else {
                    let errors = 'Invalid username/password'
                    return res.redirect(`/login?errors=${errors}`)

                }
            })
            .catch(err => {
                console.log(err);
                res.send(err)

            })
    }
    static logOut(req, res) {
        req.session.destroy(err => {
            if (err) {
                res.send(err)
            } else {
                res.redirect('/login')
            }
        })
    }
}

module.exports = UserController