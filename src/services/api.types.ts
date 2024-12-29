import { Student } from '../types/student';

export interface ApiService {
  getStudents: () => Promise<Student[]>;
  getStudent: (id: number) => Promise<Student>;
  createStudent: (student: Omit<Student, 'id'>) => Promise<Student>;
  updateStudent: (id: number, student: Omit<Student, 'id'>) => Promise<Student>;
  deleteStudent: (id: number) => Promise<void>;
}