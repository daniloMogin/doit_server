import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import * as _ from 'lodash';

import UserModel from '../models/user.server.model';
import UserCompanyModel from '../models/user-company.server.model';

const UserDBCalls = require('../repo/user_repo/user.server.repo');

const user_db = new UserDBCalls();

class UserController {
  renderRegister = (req: Request, res: Response) => {
    console.log('=================================================');
    console.log('Rendering register... (register.server.controller.ts 34)');
    console.log('=================================================');
    res.render('register', {
      title: 'Be SMART DOIT',
      user: JSON.stringify(req.user)
    });
  };

  public async getUsers(req: Request, res: Response) {
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
  }

  public async getUserByUserId(req: Request, res: Response) {
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
  }

  public async getUserByUserCompany(req: Request, res: Response) {
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
  }

  public async createUser(req: Request, res: Response) {
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
      console.log(`createUser`);
      console.log(createUser);
      console.log(createUser.errmsg);
      if (createUser.errmsg === undefined) {
        console.log(`aaaaaa`);
        res.status(201).json({ createUser });
      } else {
        console.log(`bbbbb`);
        res.status(500).json({ createUser });
      }
    } catch (error) {
      console.log('Unable to connect to db ', error);
    }
  }

  public async updateUser(req: Request, res: Response) {
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
  }
}
export = UserController;
