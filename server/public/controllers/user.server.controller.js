"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const user_server_model_1 = require("../models/user.server.model");
const UserDBCalls = require('../repo/user_repo/user.server.repo');
const user_db = new UserDBCalls();
class UserController {
    constructor() {
        this.renderRegister = (req, res) => {
            console.log('=================================================');
            console.log('Rendering register... (register.server.controller.ts 34)');
            console.log('=================================================');
            res.render('register', {
                title: 'Be SMART DOIT',
                user: JSON.stringify(req.user)
            });
        };
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    getUserByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    getUserByUserCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                console.log(`createUser`);
                console.log(createUser);
                console.log(createUser.errmsg);
                if (createUser.errmsg === undefined) {
                    console.log(`aaaaaa`);
                    res.status(201).json({ createUser });
                }
                else {
                    console.log(`bbbbb`);
                    res.status(500).json({ createUser });
                }
            }
            catch (error) {
                console.log('Unable to connect to db ', error);
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
}
module.exports = UserController;
