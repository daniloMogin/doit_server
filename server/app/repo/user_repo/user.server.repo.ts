import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jwt-simple';
import * as _ from 'lodash';

const config = require('./../../config/constants/constants');
import UserModel from '../../models/user.server.model';
const Functions = require('../../share/functions.server');
const func = new Functions();

const salt = bcrypt.genSaltSync(10);

class UserDBCalls {
    public findUser = (req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                UserModel.find()
                    .populate('company role job.jobId', '-__v')
                    .select('-job._id')
                    .exec((err, user) => {
                        if (err) throw err;
                        resolve(user);
                    });
            } catch (error) {
                res.status(500).json({ error });
            }
        });
    };

    public findUserById = (req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                UserModel.findById(req.params.userId, '-password -__v')
                    .populate('company role job.jobId', '-__v')
                    .select('-job._id')
                    .exec((err, user) => {
                        if (err) throw err;
                        resolve(user);
                    });
            } catch (error) {
                res.status(500).json({ error });
            }
        });
    };

    public findUserByUsername = (username: string, res: Response) => {
        return new Promise(resolve => {
            try {
                UserModel.findOne({ username: username })
                    .populate('company role job.jobId', '-__v')
                    .select('-job._id')
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (error) {
                res.status(500).json({ error });
            }
        });
    };

    public findUsersByCompanyName(req: Request, res: Response) {
        return new Promise((resolve, reject) => {
            try {
                UserModel.find()
                    .populate('company role job.jobId', '-__v')
                    .select('-job._id')
                    .then((users: any) => {
                        var data: any = [];
                        for (let i in users) {
                            if (!_.isNil(users[i].company)) {
                                if (users[i].company.name = req.params.company) {
                                    data.push(users[i]);
                                }
                            }
                        }
                        if (data.length > 0) {
                            resolve(data);
                        } else {
                            reject(data);
                        }
                    });
            } catch (error) {
                res.status(500).json({ error });
            }
        });
    };

    public findUsersByRoleName(req: Request, res: Response) {
        return new Promise((resolve, reject) => {
            try {
                UserModel.find()
                    .populate('company role job.jobId', '-__v')
                    .select('-job._id')
                    .then((users: any[]) => {
                        let data: any[] = [];
                        for (let i: number = 0; i < users.length; i++) {
                            for (let j: number = 0; j < users[i].role.length; j++) {
                                if (users[i].role[j].name === req.params.role) {
                                    data.push(users[i]);
                                }
                            }
                        }
                        if (data.length > 0) {
                            resolve(data);
                        } else {
                            reject(data);
                        }
                    })
                // .exec(users => {
                //     console.log(users);
                //     var data: any = [];
                //     for (let i in users) {
                //         if (users[i].role.includes(req.params.role)) {
                //             data.push(users[i]);
                //         }
                //     }
                //     if (data.length > 0) {
                //         resolve(data);
                //     } else {
                //         reject(data);
                //     }
                // });
            } catch (error) {
                res.status(500).json({ error });
            }
        });
    };


    public createUser = (user, req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                const passHash: string = bcrypt.hashSync(user.password);
                const result = new UserModel({
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
            } catch (error) {
                res.status(500).json({ error });
            }
        });
    };

    public updateUser = (user, req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                const passHash: string = bcrypt.hashSync(user.password);
                const result = {
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
                };
                UserModel.findByIdAndUpdate(
                    req.params.userId,
                    { $set: result },
                    {
                        select: '-password',
                        upsert: false,
                        new: true
                    },
                    (err, doc) => {
                        if (err) throw err;
                        resolve(doc);
                    }
                );
            } catch (error) {
                res.status(500).json({ error });
            }
        });
    };

    private authenticateUserPassword = (
        authenticate_user_email,
        req_password: string,
        res: Response
    ) => {
        const user_pass: string = authenticate_user_email.password;
        return new Promise(resolve => {
            try {
                func.authenticatePassword(
                    req_password,
                    user_pass,
                    (err: Error, isMatch: string | number) => {
                        console.log(isMatch);
                        console.log(err);
                        if (isMatch && !err) {
                            const token = jwt.encode(
                                authenticate_user_email,
                                config.secret
                            );
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
                                locationChange:
                                    authenticate_user_email.locationChange,
                                jobType: authenticate_user_email.jobType,
                                experience: authenticate_user_email.experience,
                                gender: authenticate_user_email.gender,
                                DoB: authenticate_user_email.DoB,
                                additionalInfo:
                                    authenticate_user_email.additionalInfo,
                                token: 'JWT ' + token
                            };
                            resolve(result);
                            return;
                        } else {
                            res.status(400).send({
                                message:
                                    "User with that credentials don't exist!"
                            });
                        }
                    }
                );
            } catch (err) {
                return res.status(400).send({
                    message: func.getErrorMessage(err)
                });
            }
        });
    };

    public jobApply(userId, req: Request, res: Response) {
        return new Promise((resolve, reject) => {
            try {
                UserModel.findById(userId)
                    .populate('job.jobId')
                    .then((user: any) => {
                        if (user.job.length > 0) {
                            console.log(req.params.jobId);
                            for (
                                let i: number = 0,
                                userJobLen: number = user.job.length;
                                i < userJobLen;
                                i++
                            ) {
                                if (user.job[i].jobId._id == req.params.jobId) {
                                    reject('User already applied to ' + user.job[i].jobId.name);
                                }
                            }
                            user.job.push({
                                state: 'applied',
                                jobId: req.params.jobId
                            });
                            UserModel.findByIdAndUpdate(userId, {
                                $set: {
                                    job: user.job
                                }
                            }
                            ).then(data => {
                                resolve(data);
                            }).catch(error => {
                                resolve(error);
                            });
                        } else {
                            UserModel.findByIdAndUpdate(userId, {
                                $set: {
                                    job: [{
                                        state: 'applied',
                                        jobId: req.params.jobId
                                    }]
                                }
                            }).then(data => {
                                resolve(data);
                            }).catch(error => {
                                resolve(error);
                            })
                        }
                    }).catch(error => {
                        resolve(error);
                    })
            } catch (err) {
                console.error(err);
            }
        })
    }

    public jobAccept(req: Request, res: Response) {
        return new Promise((resolve, reject) => {
            try {
                UserModel.findById(req.params.userId)
                    .then((user: any) => {
                        if (user.job.length > 0) {
                            for (
                                let i: number = 0,
                                userJobLen: number = user.job.length;
                                i < userJobLen;
                                i++
                            ) {
                                if (user.job[i].jobId == req.params.jobId) {
                                    if (user.job[i].state === 'accepted') {
                                        reject('User already accepted');
                                    } else {
                                        user.job[i].state = 'accepted';
                                        UserModel.findByIdAndUpdate(req.params.userId, {
                                            $set: {
                                                job: user.job
                                            }
                                        }, {
                                                new: true
                                            }
                                        ).then(data => {
                                            resolve(data);
                                        }).catch(error => {
                                            resolve(error);
                                        });
                                    }
                                }
                            }
                            reject('User not applied to this job');
                        } else {
                            reject('User has no active job listings');
                        }
                    }).catch(error => {
                        resolve(error);
                    })
            } catch (err) {
                console.error(err);
            }
        })
    }

    public jobRemove(userId, req: Request, res: Response) {
        return new Promise((resolve, reject) => {
            try {
                UserModel.findById(userId)
                    .then((user: any) => {
                        if (user.job.length > 0) {
                            let updating: boolean = false;
                            let newJobs = [];
                            for (
                                let i: number = 0,
                                userJobLen: number = user.job.length;
                                i < userJobLen;
                                i++
                            ) {
                                if (user.job[i].jobId == req.params.jobId) {
                                    if (user.job[i].state === 'applied') {
                                        updating = true;
                                    } else {
                                        newJobs.push(user.job[i]);
                                    }
                                } else {
                                    newJobs.push(user.job[i]);
                                }
                            }
                            if (updating) {
                                UserModel.findByIdAndUpdate(userId, {
                                    $set: {
                                        job: newJobs
                                    }
                                }, {
                                        new: true
                                    }
                                ).then(user => {
                                    resolve(user);
                                }).catch(error => {
                                    resolve(error);
                                })
                            } else {
                                reject('Job wasn\'t removed. Needs to be state applied in order to be removed');
                            }
                        } else {
                            reject('User has no active job listings');
                        }
                    }).catch(error => {
                        resolve(error);
                    })
            } catch (err) {
                console.error(err);
            }
        })
    }

    public jobDecline(req: Request, res: Response) {
        return new Promise((resolve, reject) => {
            try {
                UserModel.findById(req.params.userId)
                    .then((user: any) => {
                        if (user.job.length > 0) {
                            for (
                                let i: number = 0,
                                userJobLen: number = user.job.length;
                                i < userJobLen;
                                i++
                            ) {
                                if (user.job[i].jobId == req.params.jobId) {
                                    if (user.job[i].state === 'applied') {
                                        user.job[i].state = 'declined';
                                        UserModel.findByIdAndUpdate(req.params.userId, {
                                            $set: {
                                                job: user.job
                                            }
                                        }, {
                                                new: true
                                            }
                                        ).then(user => {
                                            resolve(user);
                                        }).catch(error => {
                                            resolve(error);
                                        })
                                    } else if (user.job[i].state === 'declined') {
                                        reject('User already declined');
                                    } else if (user.job[i].state === 'accepted') {
                                        reject('User cannot be declined after being accepted');
                                    } else {
                                        reject('User not applied to this job');
                                        // reject('What user state is this.. be gone infidel!');
                                    }
                                }
                            }
                        } else {
                            reject('User has no active job listings');
                        }
                    })
            } catch (err) {
                console.error(err);
            }
        })
    }
}

export = UserDBCalls;
