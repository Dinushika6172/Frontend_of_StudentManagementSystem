import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil } from "lucide-react";
import { StudentForm } from "../components/StudentForm";
import { Student } from "../types/student";
import { api } from "../services/api";

export const EditStudent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Omit<Student, "id">>({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    yearOfEnrollment: new Date().getFullYear(),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchStudent(parseInt(id));
    }
  }, [id]);

  const fetchStudent = async (studentId: number) => {
    try {
      const data = await api.getStudent(studentId);
      const { id: _, ...studentData } = data;
      setStudent(studentData);
    } catch (error) {
      console.error("Error fetching student:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    field: keyof Omit<Student, "id">,
    value: string | number
  ) => {
    setStudent((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      try {
        await api.updateStudent(parseInt(id), student);
        navigate("/");
      } catch (error) {
        console.error("Error updating student:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Pencil className="h-8 w-8" />
          Edit Student
        </h1>
      </div>
      <StudentForm
        student={student}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEdit
      />
    </div>
  );
};
