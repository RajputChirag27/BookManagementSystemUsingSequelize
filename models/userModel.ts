import { sequelize } from '../db';
import { DataTypes, Model } from 'sequelize';

class UserModel extends Model {
  public id!: number;
  public name!: string;
  public username!: string;
  public email!: string;
}

enum userRole {
  ADMIN = 'admin',
  USER = 'user',
  AUTHOR = 'author',
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [Object.values(userRole)],
          msg: 'Role must be one of the following: admin, user, author',
        },
      },
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    underscored: true,
  }
);

export default UserModel;
