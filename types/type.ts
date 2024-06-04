const TYPES = {
  // Controllers
  UserController: Symbol.for('UserController'),

  // Services
  UserService: Symbol.for('UserService'),

  // Middlewares
  AuthMiddleware: Symbol.for('AuthMiddleware'),

  // Validators
  UserValidator: Symbol.for('UserValidator'),

  // Repositories
  UserRepository: Symbol.for('UserRepository'),

  // Models
  UserModel: Symbol.for('UserModel'),
};

export { TYPES };
