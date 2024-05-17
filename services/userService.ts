import { injectable } from "inversify";
import { UserModel } from "../models";


@injectable()
export class UserService {
    async getUsers() {
        return await UserModel.findAll()
    }
    async createUser(body: object) {
        return await UserModel.create({ ...body });
    }

    async updateUser(body: object) {
        return await UserModel.upsert({ ...body })
    }

    async deleteUser(id: number) {
        try {
            return await UserModel.destroy({ where: { id: id } });
        } catch (err) {
            console.error('Error in deleteUser service method:', err);
            throw err; // Re-throw the error to be caught by the controller
        }
    }
    
}