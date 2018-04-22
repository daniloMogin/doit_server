"use strict";
const user_server_model_1 = require("../../models/user.server.model");
class UserDBCalls {
    constructor() {
        this.findUser = (req, res) => {
            return new Promise(resolve => {
                try {
                    user_server_model_1.default.find()
                        .then(data => {
                        resolve(data);
                    })
                        .catch(error => {
                        resolve(error);
                    });
                }
                catch (error) {
                    console.log(error);
                }
            });
        };
        this.findUserById = (req, res) => {
            return new Promise(resolve => {
                try {
                    user_server_model_1.default.findOne({ id: req.params.userId })
                        .then(data => {
                        resolve(data);
                    })
                        .catch(error => {
                        resolve(error);
                    });
                }
                catch (error) {
                    console.log(error);
                }
            });
        };
        this.createUser = (user, req, res) => {
            return new Promise(resolve => {
                try {
                    const result = new user_server_model_1.default({
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
                        additionalInfo: user.additionalInfo
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
                    console.log(error);
                }
            });
        };
        this.updateUser = (user, req, res) => {
            return new Promise(resolve => {
                try {
                    const query = { username: user.username };
                    const result = [
                        {
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
                            additionalInfo: user.additionalInfo
                        }
                    ];
                    console.log(`result`);
                    console.log(result);
                }
                catch (error) {
                    console.log(error);
                }
            });
        };
    }
}
module.exports = UserDBCalls;
