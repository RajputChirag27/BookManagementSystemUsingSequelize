export const dbConfig = {
  development: {
    username: 'postgres',
    password: 'admin',
    database: 'chirag',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'your_username',
    password: 'your_password',
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'your_username',
    password: 'your_password',
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
