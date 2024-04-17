import { Student } from "../models/students/Student.js";
import StudentsRepository from "../models/students/StudentsRepository.js";

const studentsRepository = new StudentsRepository();

export const getStudents = async (req, res) => {
  try {
    const students = await studentsRepository.getStudents();

    if (!students) {
      return res.status(404).send({ message: "Não há estudantes cadastrados" });
    }
    return res.status(200).send({ totalStudents: students.length, students });

  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar os estudantes", error: error.message});
  }

};

export const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await studentsRepository.getStudentById(id);

    if (!student) {
      return res.status(404).send({ message: "Estudante não encontrado" });
    }
  
    return res.status(200).send({ message: "Estudante encontrado", student });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar os estudantes", error: error.message});
  }

};

export const createStudent = async (req, res) => {
  try {
    const { name, age, email, code, grade } = req.body;
  const student = new Student(name, age, email, code, grade);

  await studentsRepository.addStudent(student);

  return res.status(201).send({ message: "Estudante criado com sucesso!", student });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao criar o estudante", error: error.message});
  }

};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
  const { name, age, email, code, grade } = req.body;

  const student = await studentsRepository.getStudentById(id);

  if (!student) res.status(404).send({ message: "Estudante não encontrado!" });

  await studentsRepository.updateStudent(id, name, age, email, code, grade);

  return res.send(student);
  } catch (error) {
    return res.status(500).send({ message: "Erro ao atualizar o estudante", error: error.message});
  }

};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
  const student = await studentsRepository.getStudentById(id);

  if (!student) {
    return res.status(404).send({ message: "Estudante não encontrado" });
  }

 await studentsRepository.deleteStudent(id);

  return res.send(student);
  } catch (error) {
    return res.status(500).send({ message: "Erro ao deletar o estudante", error: error.message});
  }

};