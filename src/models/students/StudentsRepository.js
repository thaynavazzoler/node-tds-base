import db from "../../database/index.js";
export default class StudentsRepository {
  constructor() {
    this.db = db;
  }

   async getStudents() {
    try {
      const allStudents = await this.db.manyOrNone("SELECT * FROM students");
      return allStudents;
    } catch (error) {
      //console.error("Failed to get students: ", error);
      throw error
    }
  }

  async getStudentById(id) {
    try {
      const student = await this.db.oneOrNone("SELECT * FROM students WHERE id = $1", id);
      return student;
    } catch (error) {
      //console.error(`failed to get user by id ${id}: `, error);
      throw error;
    }
  }

  async addStudent(student) {
    try{
      await this.db.none(
        "INSERT INTO students (id, name, age, email, code, grade) VALUES ($1, $2, $3, $4, $5, $6)", [student.id, student.name, student.age, student.email, student.code, student.grade]
      );
      return student;
    } catch(error){
      throw error;
    }
  }

  async updateStudent(id, name, age, email, code, grade) {
    try {
      const updateStudent = await this.db.one(
        "UPDATE students SET name = $1, age = $2, email = $3, code = $4, grade = $5 WHERE id = $6 RETURNING *", [name, age, email, code, grade, id]
      );

      return updateStudent;
    } catch (error) {
      throw error;
    }
  }

  async deleteStudent(id) {
    try {
      await this.db.one("DELETE FROM students WHERE id = $1", id);
    } catch (error) {
      throw error;
    }
  }
}