import { Response, Request, NextFunction } from 'express';
import * as passport from 'passport';
import * as _ from "lodash";

const config = require('./../config/constants/constants');
const RoleDBCalls = require('../repo/role.server.repo');
const FunctionsController = require('../share/functions.server');

const role_db = new RoleDBCalls();
const func = new FunctionsController();

class RoleController {

    public getRole = (passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
		console.log('=================================================');
		console.log('Get role... (role.server.controller.ts)');
		console.log('=================================================');
        
        const token: string = func.getToken(req.headers);
        console.log(`token`);
        console.log(token);
        if (token) {
            try {
                const tempEmail: string = func.decodeToken(token, config.secret);
                const findRole = await role_db.findRole();
                if (findRole.length > 0) {
                    res.status(200).json({ findRole });
                } else {
                    res.status(500).json({ findRole });
                }
            } catch (error) {
                console.log(
                    'Unable to connect to db and fetch all users. Error is ',
                    error
                );
            }
        }else {
			return res.status(403).send({ success: false, msg: 'User is not authenticated!' });
		}
    });

    public async getRolebyId(req: Request, res: Response) {
        try {
            const findRoleById = await role_db.findRoleById(req);
            if (findRoleById != null) {
                res.status(200).json({ findRoleById });
            } else {
                res.status(500).json({ findRoleById });
            }
        } catch (error) {
            console.log(
                'Unable to connect to db and fetch all users. Error is ',
                error
            );
        }
    }

    public async createRole(req: Request, res: Response) {
        const name: string = req.body.name;
        const description: string = req.body.description;

        const role = [
            {
                name,
                description
            }
        ];

        try {
            const findRole = await role_db.findRole();
            if (findRole.length === 0) {
                const createRole = await role_db.createRole(...role);
                res.status(201).json({ createRole });
            } else {
                res.status(201).json({ message: 'Role with that name is already in the database!' });
            }
        } catch (error) {
            console.log('Unable to connect to db ', error);
        }
    }

    public async updateRole(req: Request, res: Response) {
        const name: string = req.body.name;
        const description: string = req.body.description;

        const role = [
            {
                name,
                description
            }
        ];

        try {
            const findRoleById = await role_db.findRoleById(req);
            //   console.log(`findRoleById`);
            //   console.log(findRoleById);
            if (findRoleById != null) {
                console.log(`aaaaaa`);
                // const updateUser = await role_db.updateUser(...role);
                res.status(201).json({ findRoleById });
            } else {
                console.log(`bbbbb`);
                res.status(500).json({ findRoleById });
            }
        } catch (error) {
            console.log('Unable to connect to db ', error);
        }
    }
}

export = RoleController;