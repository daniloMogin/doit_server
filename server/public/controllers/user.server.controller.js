"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const passport = require("passport");
const _ = require("lodash");
const config = require('./../config/constants/constants');
const user_server_model_1 = require("../models/user.server.model");
const UserDBCalls = require('../repo/user_repo/user.server.repo');
const Functions = require('../share/functions.server');
const user_db = new UserDBCalls();
const func = new Functions();
class UserController {
    constructor() {
        this.renderRegister = (req, res) => {
            console.log('=================================================');
            console.log('Rendering register... (register.server.controller.ts 34)');
            console.log('=================================================');
            res.render('register', {
                title: 'Be SMART DOIT'
            });
        };
        this.renderUsers = (passport.authenticate('jwt', { session: false }),
            (req, res) => __awaiter(this, void 0, void 0, function* () {
                console.log('=================================================');
                console.log('Rendering user... (user.server.controller.ts 34)');
                console.log('=================================================');
                const findUser = yield user_db.findUser();
                if (findUser.length > 0) {
                    res.render('listUsers', {
                        title: 'Be SMART DOIT',
                        user: findUser
                    });
                }
                else {
                    res.status(500).json({ findUser });
                }
            }));
        this.getUsers = (passport.authenticate('jwt', { session: false }),
            (req, res) => __awaiter(this, void 0, void 0, function* () {
                const token = func.getToken(req.headers);
                if (token) {
                    const tempUsername = func.decodeToken(token, config.secret);
                    try {
                        const findUser = yield user_db.findUser();
                        if (findUser.length > 0) {
                            res.status(200).json({ findUser });
                        }
                        else {
                            res.status(500).json({ findUser });
                        }
                    }
                    catch (error) {
                        console.log('Unable to connect to db and fetch all users. Error is ', error);
                    }
                }
                else {
                    return res
                        .status(403)
                        .send({ success: false, msg: 'User is not authenticated!' });
                }
            }));
        this.getUserById = (passport.authenticate('jwt', { session: false }),
            (req, res) => __awaiter(this, void 0, void 0, function* () {
                const token = func.getToken(req.headers);
                if (token) {
                    try {
                        const findUserById = yield user_db.findUserById(req);
                        if (findUserById != null) {
                            res.status(200).json({ findUserById });
                        }
                        else {
                            res.status(500).json({ findUserById });
                        }
                    }
                    catch (error) {
                        console.log('Unable to connect to db and fetch all users. Error is ', error);
                    }
                }
                else {
                    return res
                        .status(403)
                        .send({ success: false, msg: 'User is not authenticated!' });
                }
            }));
        this.getUserByUsername = (passport.authenticate('jwt', {
            session: false
        }),
            (username, req, res) => __awaiter(this, void 0, void 0, function* () {
                const token = func.getToken(req.headers);
                if (token) {
                    try {
                        const findUserByUsername = yield user_db.findUserByUsername(username);
                        if (findUserByUsername != null) {
                            res.status(200).json({ findUserByUsername });
                        }
                        else {
                            res.status(500).json({ findUserByUsername });
                        }
                    }
                    catch (error) {
                        console.log('Unable to connect to db and fetch all users. Error is ', error);
                    }
                }
                else {
                    return res
                        .status(403)
                        .send({ success: false, msg: 'User is not authenticated!' });
                }
            }));
        this.getUserByCompany = (passport.authenticate('jwt', { session: false }),
            (req, res) => __awaiter(this, void 0, void 0, function* () {
                const token = func.getToken(req.headers);
                if (token) {
                    try {
                        user_server_model_1.default.findOne({ id: req.params.userId })
                            .then(data => {
                            res.status(200).json({ data });
                        })
                            .catch(error => {
                            res.status(500).json({ error });
                        });
                    }
                    catch (error) {
                        console.log('Unable to connect to db and fetch all users. Error is ', error);
                    }
                }
                else {
                    return res
                        .status(403)
                        .send({ success: false, msg: 'User is not authenticated!' });
                }
            }));
        this.getUserByRole = (passport.authenticate('jwt', { session: false }),
            (req, res) => __awaiter(this, void 0, void 0, function* () {
                const token = func.getToken(req.headers);
                if (token) {
                    try {
                        user_server_model_1.default.findOne({ id: req.params.userId })
                            .then(data => {
                            res.status(200).json({ data });
                        })
                            .catch(error => {
                            res.status(500).json({ error });
                        });
                    }
                    catch (error) {
                        console.log('Unable to connect to db and fetch all users. Error is ', error);
                    }
                }
                else {
                    return res
                        .status(403)
                        .send({ success: false, msg: 'User is not authenticated!' });
                }
            }));
        this.createUser = (passport.authenticate('jwt', { session: false }),
            (req, res) => __awaiter(this, void 0, void 0, function* () {
                const token = func.getToken(req.headers);
                if (token) {
                    const name = req.body.name;
                    const lastname = req.body.lastname;
                    const username = req.body.username;
                    const password = req.body.password;
                    const email = req.body.email;
                    const status = req.body.status;
                    const city = req.body.city;
                    const country = req.body.country;
                    const locationChange = req.body.locationChange;
                    const jobType = req.body.jobType;
                    const experience = req.body.experience;
                    const gender = req.body.gender;
                    const DoB = req.body.DoB;
                    const additionalInfo = req.body.username;
                    const user = [
                        {
                            name,
                            lastname,
                            username,
                            password,
                            email,
                            status,
                            city,
                            country,
                            locationChange,
                            jobType,
                            experience,
                            gender,
                            DoB,
                            additionalInfo
                        }
                    ];
                    try {
                        const createUser = yield user_db.createUser(...user);
                        if (createUser.errmsg === undefined) {
                            res.status(201).json({ createUser });
                        }
                        else {
                            res.status(500).json({ createUser });
                        }
                    }
                    catch (error) {
                        console.log('Unable to connect to db ', error);
                    }
                }
                else {
                    return res
                        .status(403)
                        .send({ success: false, msg: 'User is not authenticated!' });
                }
            }));
        this.updateUser = (passport.authenticate('jwt', { session: false }),
            (req, res) => __awaiter(this, void 0, void 0, function* () {
                const token = func.getToken(req.headers);
                if (token) {
                    const name = req.body.name;
                    const lastname = req.body.lastname;
                    const username = req.body.username;
                    const password = req.body.password;
                    const email = req.body.email;
                    const status = req.body.status;
                    const city = req.body.city;
                    const country = req.body.country;
                    const locationChange = req.body.locationChange;
                    const jobType = req.body.jobType;
                    const experience = req.body.experience;
                    const gender = req.body.gender;
                    const DoB = req.body.DoB;
                    const additionalInfo = req.body.username;
                    const user = [
                        {
                            name,
                            lastname,
                            username,
                            password,
                            email,
                            status,
                            city,
                            country,
                            locationChange,
                            jobType,
                            experience,
                            gender,
                            DoB,
                            additionalInfo
                        }
                    ];
                    try {
                        const findUserById = yield user_db.findUserById(req);
                        if (findUserById != null) {
                            const updateUser = yield user_db.updateUser(...user);
                        }
                        else {
                            res.status(500).json({ findUserById });
                        }
                    }
                    catch (error) {
                        console.log('Unable to connect to db ', error);
                    }
                }
                else {
                    return res
                        .status(403)
                        .send({ success: false, msg: 'User is not authenticated!' });
                }
            }));
    }
    authenticate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validate_login = yield func.validateLogin(req.body.username, req.body.password, res);
                if (_.isNil(validate_login.error)) {
                    const authenticate_user_email = yield user_db.findUserByUsername(validate_login.username);
                    if (!_.isNil(authenticate_user_email)) {
                        const authenticate_user_password = yield user_db.authenticateUserPassword(authenticate_user_email, req.body.password, res);
                        res.status(201).json({ authenticate_user_password });
                    }
                    else {
                        res.status(500).json({ error: authenticate_user_email });
                    }
                }
                else {
                    res.status(500).json({ validate_login });
                }
            }
            catch (error) {
                console.log('User error ', error);
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findUserByUsername = yield user_db.findUserByUsername(req.body.username);
                if (findUserByUsername != null) {
                    res
                        .status(403)
                        .json({ error: 'User with that username already exists' });
                }
                else {
                    const name = req.body.name;
                    const lastname = req.body.lastname;
                    const username = req.body.username;
                    const password = req.body.password;
                    const email = req.body.email;
                    const status = req.body.status;
                    const city = req.body.city;
                    const country = req.body.country;
                    const locationChange = req.body.locationChange;
                    const jobType = req.body.jobType;
                    const experience = req.body.experience;
                    const gender = req.body.gender;
                    const DoB = req.body.DoB;
                    const additionalInfo = req.body.username;
                    const user = [
                        {
                            name,
                            lastname,
                            username,
                            password,
                            email,
                            status,
                            city,
                            country,
                            locationChange,
                            jobType,
                            experience,
                            gender,
                            DoB,
                            additionalInfo
                        }
                    ];
                    const validate_register = yield func.validateRegister(...user, res);
                    if (_.isNil(validate_register.error)) {
                        const createUser = yield user_db.createUser(validate_register);
                        if (createUser.errmsg === undefined) {
                            res.status(200).json({ createUser });
                        }
                    }
                    else {
                        res.status(500).json({ validate_register });
                    }
                }
            }
            catch (error) {
                console.log('User error ', error);
            }
        });
    }
}
module.exports = UserController;