import { Sequelize } from 'sequelize';
import { dbConfig } from '../config/config';

const sequelize = new Sequelize(
  dbConfig.development.database || (process.env.DB_DATABASE as string),
  dbConfig.development.username || (process.env.DB_USERNAME as string),
  dbConfig.development.password || process.env.DB_PASSWORD,
  {
    host: dbConfig.development.host || process.env.DB_HOST,
    dialect:
      (dbConfig.development.dialect as any) || process.env.DB_DIALECT,
  }
);

export default sequelize;
