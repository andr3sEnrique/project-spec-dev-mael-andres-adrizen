function User(id) {
  this.id = id;
}

const createUser = (id, name, login) => {
  const user = new User(id);

  Object.defineProperty(user, "login", { writable: false, value: login });
  Object.defineProperty(user, "name", { writable: false, value: name });

  return user;
};

export { User, createUser };
