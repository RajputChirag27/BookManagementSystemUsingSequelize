import { Container, ContainerModule, interfaces } from 'inversify';
import * as Controller from './controllers'
import * as Models from './models'
import * as Services from './services'
import { TYPES } from './types/type';

const container = new Container();

const controllers : Array<interfaces.Newable<any>> = Object.values(Controller);
const services : Array<interfaces.Newable<any>> = Object.values(Services);
const models : Array<interfaces.Newable<any>> = Object.values(Models);

// Model Binding
const modelsModule = new ContainerModule((bind)=>{
    models.forEach((model) => {
        bind(model).to(model);
    })
})


// Controller Binding

const controllerModule = new ContainerModule((bind) => {
    controllers.forEach((controller) => {
        bind<typeof controller>(controller).to(controller);
    })
})

  // Service Bindings
  const serviceModule = new ContainerModule((bind) => {
    services.forEach((service)=>{
        bind<typeof service>(service).to(service);
    })
  })


  container.bind(Services.UserService).to(Services.UserService)

export default container;
