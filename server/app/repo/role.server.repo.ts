import { Request, Response, NextFunction } from 'express';

// import RoleModel from '../models/user.server.model';
import RoleModel from '../models/role.server.model';
// import UserRoleModel from '../models/user-role.server.model';

class RoleDBCalls {
    public findRole = (req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                RoleModel.find()
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

    public findRoleById = (req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                console.log(`req.body`);
                console.log(req.body);
                RoleModel.findOne({ _id: req.params.roleId })
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

    public createRole = (role, req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                const result = new RoleModel({
                    name: role.name,
                    description: role.description
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

    public updateRole = (role, req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                const query = { name: role.name };
                const result = [
                    {
                        name: role.name,
                        description: role.description
                    }
                ];

                console.log(`result`);
                console.log(result);
                // RoleModel.update(query, result, {upsert:true}, function(err, doc){
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

export = RoleDBCalls;
