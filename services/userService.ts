import { injectable } from 'inversify';
import { UserModel } from '../models';
import { Op } from 'sequelize';

@injectable()
export class UserService {
        async getUsers(queryObject) {
          // global search
          console.log(queryObject);
          console.log(queryObject.search)
          let ans;
          if(queryObject.search){
              const { count, rows } = await UserModel.findAndCountAll({
                  where: {
                    username: {
                      [Op.like]: `%${queryObject.search}%`,
                    },
                    name: {
                        [Op.like]: `%${queryObject.search}%`,
                      },
                  },
                  offset: 10,
                  limit: 2,
                });
                console.log(count);
                console.log(rows);
                ans = rows;
          } else{
            ans = await UserModel.findAll();
          }
          // filteration
      
          // projection
      
          // pagination
      
          return ans;
        }
  async createUser(body: object) {
    return await UserModel.create({ ...body });
  }

  async updateUser(body: object) {
    return await UserModel.upsert({ ...body });
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
