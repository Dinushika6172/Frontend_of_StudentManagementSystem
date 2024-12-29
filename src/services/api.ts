import axios from 'axios';
import { Student } from '../types/student';
import { ApiService } from './api.types';
import { mockApi } from './mockApi';

const API_URL = 'http://localhost:3000/api';

const realApi: ApiService = {
  getStudents: async () => {
    const response = await axios.get<Student[]>(`${API_URL}/students`);
    return response.data;
  },

  getStudent: async (id: number) => {
    const response = await axios.get<Student>(`${API_URL}/students/${id}`);
    return response.data;
  },

  createStudent: async (student: Omit<Student, 'id'>) => {
    const response = await axios.post<Student>(`${API_URL}/students`, student);
    return response.data;
  },

  updateStudent: async (id: number, student: Omit<Student, 'id'>) => {
    const response = await axios.put<Student>(`${API_URL}/students/${id}`, student);
    return response.data;
  },

  deleteStudent: async (id: number) => {
    await axios.delete(`${API_URL}/students/${id}`);
  }
};

const USE_MOCK_API = true; // Toggle this to switch between mock and real API

export const api: ApiService = USE_MOCK_API ? mockApi : realApi;