import User from "./UserInterface.js";
const users: User[] = [];

export const getAllUsers = (): User[] => {
  return users;
};

export const addNewUser = (user: User): Promise<User> => {
  return new Promise<User>((resolve, reject) => {
    try {
      const newUser = new User(user.username, user.age, user.hobbies);
      users.push(newUser);
      resolve(newUser);
    } catch (err) {
      reject(err);
    }
  });
};
