import { Student } from '../types/student';
import { ApiService } from './api.types';
import { mockStudents } from '../data/mockStudents';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi: ApiService = {
  getStudents: async () => {
    await delay(500);
    return [...mockStudents];
  },

  getStudent: async (id: number) => {
    await delay(500);
    const student = mockStudents.find(s => s.id === id);
    if (!student) {
      throw new Error('Student not found');
    }
    return { ...student };
  },

  createStudent: async (student: Omit<Student, 'id'>) => {
    await delay(500);
    const newStudent = {
      ...student,
      id: Math.max(0, ...mockStudents.map(s => s.id ?? 0)) + 1
    };
    mockStudents.push(newStudent);
    return newStudent;
  },

  updateStudent: async (id: number, student: Omit<Student, 'id'>) => {
    await delay(500);
    const index = mockStudents.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Student not found');
    }
    const updatedStudent = { ...student, id };
    mockStudents[index] = updatedStudent;
    return updatedStudent;
  },

  deleteStudent: async (id: number) => {
    await delay(500);
    const index = mockStudents.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Student not found');
    }
    mockStudents.splice(index, 1);
  }
};