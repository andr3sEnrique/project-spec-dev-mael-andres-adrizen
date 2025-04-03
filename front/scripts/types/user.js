function User() {}

const createUser = (name, login) => {
  const user = new User();

  Object.defineProperty(user, "login", { writable: false, value: login });
  Object.defineProperty(user, "name", { writable: false, value: name });

  Object.defineProperty(user, "token", { value: "", writable: true, enumerable: false });
  Object.defineProperty(user, "tokenEndDate", { value: "", writable: true, enumerable: false });

  Object.defineProperty(user, "setToken", {
    value: (token) => {
      user.token = token;
      user.tokenEndDate = new Date(new Date().getTime() + 30 * 60000); // 30 minutes pour l'expiration du token
    },
  });

  return user;
};

export { User, createUser };
