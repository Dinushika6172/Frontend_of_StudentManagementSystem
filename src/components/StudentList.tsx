import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, UserPlus, GraduationCap, Search } from "lucide-react";
import { Student } from "../types/student";
import { api } from "../services/api";
import { handleApiError } from "../utils/errorHandling";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";

export const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setError(null);
      const data = await api.getStudents();
      setStudents(data);
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        setError(null);
        await api.deleteStudent(id);
        setStudents(students.filter((student) => student.id !== id));
      } catch (error) {
        const errorMessage = handleApiError(error);
        setError(errorMessage);
        console.error("Error deleting student:", error);
      }
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-hero-pattern bg-cover bg-center py-20 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3 mb-4">
            <GraduationCap className="h-10 w-10" />
            Student Management System
          </h1>
          <p className="text-white text-xl opacity-90">
            Manage your students efficiently
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => navigate("/add")}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-700 transition-colors shadow-lg"
          >
            <UserPlus className="h-5 w-5" />
            Add Student
          </button>
        </div>

        {error && <ErrorMessage message={error} />}

        {!error && filteredStudents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <GraduationCap className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">
              {searchTerm
                ? "No students found matching your search."
                : "No students found. Add some students to get started!"}
            </p>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                          {student.firstName[0]}
                          {student.lastName[0]}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {student.firstName} {student.lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {student.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                        {student.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {student.yearOfEnrollment}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => navigate(`/edit/${student.id}`)}
                          className="text-primary-600 hover:text-primary-900 transition-colors"
                        >
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => student.id && handleDelete(student.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
