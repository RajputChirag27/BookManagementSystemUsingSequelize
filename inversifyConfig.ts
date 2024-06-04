import { Container, ContainerModule, interfaces } from 'inversify';
import 'reflect-metadata';
import * as controller from './controllers';
import * as models from './models';
import * as service from './services';

const container = new Container();

// const controllers : Array<interfaces.Newable<any>> = Object.values(Controller);
// const services : Array<interfaces.Newable<any>> = Object.values(Services);
// const models : Array<interfaces.Newable<any>> = Object.values(Models);

// // Model Binding
// const modelsModule = new ContainerModule((bind : interfaces.Bind)=>{
//     models.forEach((model) => {
//         bind(model).to(model);
//     })
// })

// // Controller Binding

// const controllerModule = new ContainerModule((bind : interfaces.Bind) => {
//     controllers.forEach((controller) => {
//         bind<typeof controller>(controller).to(controller);
//     })
// })

// // console.log(services, controllers)
// // console.log(typeof services)
//   // Service Bindings
//   const serviceModule = new ContainerModule((bind : interfaces.Bind) => {
//     services.forEach((service)=>{
//         console.log(service)
//         bind(service).to(service);
//     })
//   })

for (const controllerName in controller) {
  const Controller = controller[controllerName];
  container.bind<typeof Controller>(Controller).toSelf();
}

for (const serviceName in service) {
  const Service = service[serviceName];
  container.bind<typeof Service>(Service).toSelf();
}

for (const moduleName in module) {
  const Module = module[moduleName];
  container.bind<typeof Module>(Module).to(Module);
}

//   container.bind(Services.UserService).to(Services.UserService)

export default container;
