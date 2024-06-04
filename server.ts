import 'reflect-metadata';
import { config } from 'dotenv';
import express from 'express';
import swaggerDocument from './swagger.json';
import swaggerUI from 'swagger-ui-express';
import { sequelize } from './db';
import container from './inversifyConfig';
import { InversifyExpressServer } from 'inversify-express-utils';

config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
// Sequelize Setup

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

// const connect = async () =>{
//   try{
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch(err){
//     console.error(err);
//   }

// }

sequelize
  .sync()
  .then(() => console.log('Database synced'))
  .catch((error) => console.error('Error syncing database', error));

// Swagger Docs
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Inversify Config
const server = new InversifyExpressServer(
  container,
  null,
  { rootPath: '/api' },
  app
);

const appConfigured = server.build();
// Creating an Express app

// Listening an Express App
appConfigured.listen(port, () => {
  console.log('App is listening on port ' + port);
});
