import { inject } from 'inversify';
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from 'inversify-express-utils';
import { NextFunction, Request, Response } from 'express';
import { TYPES } from '../types/type';
import { UserService } from '../services/userService';
import customErrorHandler from '../handlers/errorHandler';
import { statusCodes } from '../constants/statusCodes';

@controller('/user')
export class UserController {
  constructor(@inject(UserService) private userService: UserService) {}

  @httpGet('/')
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const queryObject = { ...req.query };
      const users = await this.userService.getUsers(queryObject);
      res.send(users);
    } catch (err) {
      customErrorHandler(err, req, res, next);
    }
  }

  @httpPost('/')
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const body = { ...req.body };
      const user = await this.userService.createUser(body);
      res.send(user);
    } catch (err) {
      customErrorHandler(err, req, res, next);
    }
  }

  @httpPut('/:id')
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const body = { ...req.body };
      const user = await this.userService.updateUser(body);
      res.send(user);
    } catch (err) {
      customErrorHandler(err, req, res, next);
    }
  }

  @httpDelete('/:id')
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const user = await this.userService.deleteUser(Number(id));
      console.log(user);
      if (user) {
        res.sendStatus(statusCodes.OK).json({ user });
      } else {
        res.send('User not Found');
      }
    } catch (err) {
      customErrorHandler(err, req, res, next);
    }
  }
}
