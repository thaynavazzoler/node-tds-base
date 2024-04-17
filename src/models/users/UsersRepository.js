import db from "../../database/index.js";
export default class UsersRepository {
  constructor() {
    this.db = db;
  }

  async getUsers() {
    try{
      const allUsers = await this.db.manyOrNone("SELECT * FROM users");
      //console.log(allUsers);
      
      return allUsers;
    } catch (error) {
      console.error("Failed to get users: ", error);
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const user = await this.db.oneOrNone("SELECT * FROM users WHERE id = $1", id);

    //console.log("Será que vem?", user);
    return user;
    } catch (error) {
      console.error(`Failed to get user by id ${id}: `, error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.db.oneOrNone("SELECT * FROM users WHERE email = $1", email);
    return user;
    } catch (error) {
      console.error(`Failed to get user by email ${email}: `, error);
      throw error;
    }
  }

  async createUser(user) {
    try {
      await this.db.none(
        "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)", [user.id, user.name, user.email, user.password]
      );
      return user;
    } catch (error) {
      console.error("Failed to create user: ", error);
      throw error;
    }
  }

  async updateUser(id, name, email, password) {
    try {
      const updateUser = await this.db.one(
        "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *", [name, email, password, id]
      );
    
     return updateUser;
    } catch (error) {
      console.error(`Failed to update user by id ${id}: `, error);
      throw error;
    }
   
  }

  async deleteUser(id) {
    try {
      await this.db.one("DELETE FROM users WHERE id = $1", id);
    } catch (error) {
      console.error(`Failed to delete user by id ${id}: `, error);
      throw error;
    }
    
  }
}