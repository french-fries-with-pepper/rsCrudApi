import { v4 } from "uuid";

export default class User {
  readonly id?: string;
  username: string;
  age: number;
  hobbies: string[];

  constructor(username: string, age: number, hobbies: string[]) {
    this.id = v4();
    if (!username) throw new Error("username is required");
    if (!age) throw new Error("age is required");
    if (!hobbies) throw new Error("hobbies is required");
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }
}
