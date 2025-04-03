function User(id) {
  this.id = id;
}

const createUser = (id, name, login) => {
  const user = new User(id);

  Object.defineProperty(user, "login", { writable: false, value: login });
  Object.defineProperty(user, "name", { writable: false, value: name });

  Object.defineProperty(user, "token", { value: "", writable: false, enumerable: false });
  Object.defineProperty(user, "tokenEndDate", { value: "", writable: false, enumerable: false });

  Object.defineProperty(user, "addToken", {
    value: (token) => {
      user.token = token;
      user.tokenEndDate = new Date(oldDateObj.getTime() + 30 * 60000); // 30 minutes pour l'expiration du token
    },
  });

  return user;
};

export { User, createUser };
