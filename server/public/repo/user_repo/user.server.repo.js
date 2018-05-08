"use strict";
const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");
const config = require('./../../config/constants/constants');
const user_server_model_1 = require("../../models/user.server.model");
const Functions = require('../../share/functions.server');
const func = new Functions();
const salt = bcrypt.genSaltSync(10);
class UserDBCalls {
    constructor() {
        this.findUser = (req, res) => {
            return new Promise(resolve => {
                try {
                    user_server_model_1.default.find()
                        .populate('role')
                        .exec((err, user) => {
                        if (err)
                            throw err;
                        resolve(user);
                    });
                }
                catch (error) {
                    res.status(500).json({ error });
                }
            });
        };
        this.findUserById = (req, res) => {
            return new Promise(resolve => {
                try {
                    user_server_model_1.default.findOne({ _id: req.params.userId }, '-password')
                        .then(data => {
                        resolve(data);
                    })
                        .catch(error => {
                        resolve(error);
                    });
                }
                catch (error) {
                    res.status(500).json({ error });
                }
            });
        };
        this.findUserByUsername = (username, res) => {
            return new Promise(resolve => {
                try {
                    user_server_model_1.default.findOne({ username: username })
                        .then(data => {
                        resolve(data);
                    })
                        .catch(error => {
                        resolve(error);
                    });
                }
                catch (error) {
                    res.status(500).json({ error });
                }
            });
        };
        this.createUser = (user, req, res) => {
            return new Promise(resolve => {
                try {
                    const passHash = bcrypt.hashSync(user.password);
                    const result = new user_server_model_1.default({
                        name: user.name,
                        lastname: user.lastname,
                        username: user.username,
                        password: passHash,
                        email: user.email,
                        status: user.status,
                        city: user.city,
                        country: user.country,
                        locationChange: user.locationChange,
                        jobType: user.jobType,
                        experience: user.experience,
                        gender: user.gender,
                        DoB: user.DoB,
                        additionalInfo: user.additionalInfo,
                        role: user.role
                    });
                    result
                        .save()
                        .then(data => {
                        resolve(data);
                    })
                        .catch(error => {
                        resolve(error);
                    });
                }
                catch (error) {
                    res.status(500).json({ error });
                }
            });
        };
        this.updateUser = (user, req, res) => {
            return new Promise(resolve => {
                try {
                    const query = { _id: req.params.userId };
                    const result = {
                        name: user.name,
                        lastname: user.lastname,
                        username: user.username,
                        password: user.password,
                        email: user.email,
                        status: user.status,
                        city: user.city,
                        country: user.country,
                        locationChange: user.locationChange,
                        jobType: user.jobType,
                        experience: user.experience,
                        gender: user.gender,
                        DoB: user.DoB,
                        additionalInfo: user.additionalInfo,
                        role: user.role
                    };
                    user_server_model_1.default.findOneAndUpdate(query, { $set: result }, {
                        upsert: false,
                        new: true
                    }, (err, doc) => {
                        if (err)
                            throw err;
                        resolve(doc);
                    });
                }
                catch (error) {
                    res.status(500).json({ error });
                }
            });
        };
        this.authenticateUserPassword = (authenticate_user_email, req_password, res) => {
            const user_pass = authenticate_user_email.password;
            return new Promise(resolve => {
                try {
                    func.authenticatePassword(req_password, user_pass, (err, isMatch) => {
                        if (isMatch && !err) {
                            const token = jwt.encode(authenticate_user_email, config.secret);
                            const result = {
                                success: true,
                                id: authenticate_user_email._id,
                                name: authenticate_user_email.name,
                                lastName: authenticate_user_email.lastname,
                                username: authenticate_user_email.username,
                                email: authenticate_user_email.email,
                                status: authenticate_user_email.status,
                                city: authenticate_user_email.city,
                                country: authenticate_user_email.country,
                                locationChange: authenticate_user_email.locationChange,
                                jobType: authenticate_user_email.jobType,
                                experience: authenticate_user_email.experience,
                                gender: authenticate_user_email.gender,
                                DoB: authenticate_user_email.DoB,
                                additionalInfo: authenticate_user_email.additionalInfo,
                                token: 'JWT ' + token
                            };
                            resolve(result);
                            return;
                        }
                        else {
                            res.status(400).send({
                                message: "User with that credentials don't exist!"
                            });
                        }
                    });
                }
                catch (err) {
                    return res.status(400).send({
                        message: func.getErrorMessage(err)
                    });
                }
            });
        };
    }
}
module.exports = UserDBCalls;
