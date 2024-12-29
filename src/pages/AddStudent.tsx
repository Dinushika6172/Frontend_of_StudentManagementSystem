import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, ArrowLeft } from "lucide-react";
import { StudentForm } from "../components/StudentForm";
import { Student } from "../types/student";
import { api } from "../services/api";
import { PageHeader } from "../components/PageHeader";
import { handleApiError } from "../utils/errorHandling";

export const AddStudent: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState<Omit<Student, "id">>({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    yearOfEnrollment: new Date().getFullYear(),
  });

  const handleChange = (
    field: keyof Omit<Student, "id">,
    value: string | number
  ) => {
    setStudent((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.createStudent(student);
      navigate("/");
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        icon={UserPlus}
        title="Add New Student"
        description="Enter the student's information below"
      />

      <div className="container mx-auto px-4 pb-12">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Students
        </button>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <StudentForm
              student={student}
              onChange={handleChange}
              onSubmit={handleSubmit}
              error={error}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
