import { Request, Response, NextFunction } from 'express';

import UserModel from '../../models/user.server.model';
import UserCompanyModel from '../../models/user-company.server.model';

class UserDBCalls {
  public findUser = (req: Request, res: Response) => {
    return new Promise(resolve => {
      try {
        UserModel.find()
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            resolve(error);
          });
      } catch (error) {
        console.log(error);
      }
    });
  };

  public findUserById = (req: Request, res: Response) => {
    return new Promise(resolve => {
      try {
        UserModel.findOne({ id: req.params.userId })
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            resolve(error);
          });
      } catch (error) {
        console.log(error);
      }
    });
  };

  public createUser = (user, req: Request, res: Response) => {
    return new Promise(resolve => {
      try {
        const result = new UserModel({
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
      } catch (error) {
        console.log(error);
      }
    });
  };

  public updateUser = (user, req: Request, res: Response) => {
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
        // UserModel.update(query, result, {upsert:true}, function(err, doc){
        //     if (err) throw err
        //     resolve(doc);
        // });
        // result
        //   .update(result)
        //   .then(data => {
        //     resolve(`data ${data}`);
        //   })
        //   .catch(error => {
        //     resolve(`error ${error}`);
        //   });
      } catch (error) {
        console.log(error);
      }
    });
  };
}

export = UserDBCalls;
