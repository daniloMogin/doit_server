import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import * as _ from 'lodash';

const config = require('./../config/constants/constants');

import UserModel from '../models/user.server.model';
import UserCompanyModel from '../models/user-company.server.model';

const UserDBCalls = require('../repo/user_repo/user.server.repo');
const Functions = require('../share/functions.server');

const user_db = new UserDBCalls();
const func = new Functions();

class UserController {
    renderRegister = (req: Request, res: Response) => {
        console.log('=================================================');
        console.log('Rendering register... (register.server.controller.ts 34)');
        console.log('=================================================');
        res.render('register', {
            title: 'Be SMART DOIT'
        });
    };

    renderUsers = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        console.log('=================================================');
        console.log('Rendering user... (user.server.controller.ts 34)');
        console.log('=================================================');
        const findUser = await user_db.findUser();
        if (findUser.length > 0) {
            res.render('listUsers', {
                title: 'Be SMART DOIT',
                user: findUser
            });
        } else {
            res.status(500).json({ findUser });
        }
    });

    public getUsers = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            const tempUsername: string = func.decodeToken(token, config.secret);
            try {
                const findUser = await user_db.findUser();
                if (findUser.length > 0) {
                    res.status(200).json({ findUser });
                } else {
                    res.status(500).json({ findUser });
                }
            } catch (error) {
                console.log(
                    'Unable to connect to db and fetch all users. Error is ',
                    error
                );
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    public getUserById = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            try {
                const findUserById = await user_db.findUserById(req);
                if (findUserById != null) {
                    res.status(200).json({ findUserById });
                } else {
                    res.status(500).json({ findUserById });
                }
            } catch (error) {
                console.log(
                    'Unable to connect to db and fetch all users. Error is ',
                    error
                );
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    public getUserByUsername = (passport.authenticate('jwt', {
        session: false
    }),
    async (username: string, req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            try {
                const findUserByUsername = await user_db.findUserByUsername(
                    username
                );
                if (findUserByUsername != null) {
                    res.status(200).json({ findUserByUsername });
                } else {
                    res.status(500).json({ findUserByUsername });
                }
            } catch (error) {
                console.log(
                    'Unable to connect to db and fetch all users. Error is ',
                    error
                );
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    public getUserByCompany = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            try {
                UserModel.findOne({ id: req.params.userId })
                    .then(data => {
                        res.status(200).json({ data });
                    })
                    .catch(error => {
                        res.status(500).json({ error });
                    });
            } catch (error) {
                console.log(
                    'Unable to connect to db and fetch all users. Error is ',
                    error
                );
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    public getUserByRole = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            try {
                UserModel.findOne({ id: req.params.userId })
                    .then(data => {
                        res.status(200).json({ data });
                    })
                    .catch(error => {
                        res.status(500).json({ error });
                    });
            } catch (error) {
                console.log(
                    'Unable to connect to db and fetch all users. Error is ',
                    error
                );
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    public createUser = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            const name: string = req.body.name;
            const lastname: string = req.body.lastname;
            const username: string = req.body.username;
            const password: string = req.body.password;
            const email: string = req.body.email;
            const status: string = req.body.status;
            const city: string = req.body.city;
            const country: string = req.body.country;
            const locationChange: string = req.body.locationChange;
            const jobType: string = req.body.jobType;
            const experience: string = req.body.experience;
            const gender: string = req.body.gender;
            const DoB: string = req.body.DoB;
            const additionalInfo: string = req.body.username;

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
                const createUser = await user_db.createUser(...user);
                if (createUser.errmsg === undefined) {
                    res.status(201).json({ createUser });
                } else {
                    res.status(500).json({ createUser });
                }
            } catch (error) {
                console.log('Unable to connect to db ', error);
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    public updateUser = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            const name: string = req.body.name;
            const lastname: string = req.body.lastname;
            const username: string = req.body.username;
            const password: string = req.body.password;
            const email: string = req.body.email;
            const status: string = req.body.status;
            const city: string = req.body.city;
            const country: string = req.body.country;
            const locationChange: string = req.body.locationChange;
            const jobType: string = req.body.jobType;
            const experience: string = req.body.experience;
            const gender: string = req.body.gender;
            const DoB: string = req.body.DoB;
            const additionalInfo: string = req.body.username;

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
                const findUserById = await user_db.findUserById(req);
                //   console.log(`findUserById`);
                //   console.log(findUserById);
                if (findUserById != null) {
                    const updateUser = await user_db.updateUser(...user);
                } else {
                    res.status(500).json({ findUserById });
                }
            } catch (error) {
                console.log('Unable to connect to db ', error);
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    public async authenticate(req: Request, res: Response) {
        try {
            const validate_login = await func.validateLogin(
                req.body.username,
                req.body.password,
                res
            );
            if (_.isNil(validate_login.error)) {
                const authenticate_user_email = await user_db.findUserByUsername(
                    validate_login.username
                );
                if (!_.isNil(authenticate_user_email)) {
                    const authenticate_user_password = await user_db.authenticateUserPassword(
                        authenticate_user_email,
                        req.body.password,
                        res
                    );
                    res.status(201).json({ authenticate_user_password });
                } else {
                    res.status(500).json({ error: authenticate_user_email });
                }
            } else {
                res.status(500).json({ validate_login });
            }
        } catch (error) {
            console.log('User error ', error);
        }
    }

    public async register(req: Request, res: Response) {
        try {
            const findUserByUsername = await user_db.findUserByUsername(
                req.body.username
            );
            if (findUserByUsername != null) {
                res
                    .status(403)
                    .json({ error: 'User with that username already exists' });
            } else {
                const name: string = req.body.name;
                const lastname: string = req.body.lastname;
                const username: string = req.body.username;
                const password: string = req.body.password;
                const email: string = req.body.email;
                const status: string = req.body.status;
                const city: string = req.body.city;
                const country: string = req.body.country;
                const locationChange: string = req.body.locationChange;
                const jobType: string = req.body.jobType;
                const experience: string = req.body.experience;
                const gender: string = req.body.gender;
                const DoB: string = req.body.DoB;
                const additionalInfo: string = req.body.username;
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
                const validate_register = await func.validateRegister(
                    ...user,
                    res
                );
                if (_.isNil(validate_register.error)) {
                    const createUser = await user_db.createUser(
                        validate_register
                    );
                    if (createUser.errmsg === undefined) {
                        res.status(200).json({ createUser });
                    }
                } else {
                    res.status(500).json({ validate_register });
                }
            }
        } catch (error) {
            console.log('User error ', error);
        }
    }
}
export = UserController;
