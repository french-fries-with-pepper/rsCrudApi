import User from "./UserInterface.js";
const users: User[] = [];

export const getAllUsers = (): User[] => {
  return users;
};

export const getUserById = (id: string): Promise<User> => {
  return new Promise((resolve) => {
    const result = users.find((user) => user.id === id);
    if (!result) throw new Error();
    return resolve(result);
  });
};

export const addNewUser = (user: User): Promise<User> => {
  return new Promise<User>((resolve, reject) => {
    try {
      const newUser = new User(user.username, user.age, user.hobbies);
      users.push(newUser);
      return resolve(newUser);
    } catch (err) {
      return reject(err);
    }
  });
};

export const updateUserById = (id: string, user: User): Promise<User> => {
  return new Promise((resolve) => {
    const idx = users.findIndex((el) => el.id === id);
    if (idx < 0) throw new Error();
    if (user.username) users[idx].username = user.username;
    if (user.age) users[idx].age = user.age;
    if (user.hobbies) users[idx].hobbies = user.hobbies;
    return resolve(users[idx]);
  });
};
