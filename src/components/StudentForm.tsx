import React from "react";
import { Student } from "../types/student";
import { FormField } from "./FormField";

interface StudentFormProps {
  student: Omit<Student, "id">;
  onChange: (field: keyof Omit<Student, "id">, value: string | number) => void;
  onSubmit: (e: React.FormEvent) => void;
  error?: string | null;
  loading?: boolean;
  isEdit?: boolean;
}

export const StudentForm: React.FC<StudentFormProps> = ({
  student,
  onChange,
  onSubmit,
  error,
  loading = false,
  isEdit = false,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="First Name" id="firstName">
          <input
            type="text"
            id="firstName"
            value={student.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </FormField>

        <FormField label="Last Name" id="lastName">
          <input
            type="text"
            id="lastName"
            value={student.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </FormField>
      </div>

      <FormField label="Email Address" id="email">
        <input
          type="email"
          id="email"
          value={student.email}
          onChange={(e) => onChange("email", e.target.value)}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          required
        />
      </FormField>

      <FormField label="Department" id="department">
        <input
          type="text"
          id="department"
          value={student.department}
          onChange={(e) => onChange("department", e.target.value)}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          required
        />
      </FormField>

      <FormField label="Year of Enrollment" id="yearOfEnrollment">
        <input
          type="number"
          id="yearOfEnrollment"
          value={student.yearOfEnrollment}
          onChange={(e) =>
            onChange("yearOfEnrollment", parseInt(e.target.value))
          }
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          required
          min="2000"
          max="2099"
        />
      </FormField>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>{isEdit ? "Update Student" : "Add Student"}</>
          )}
        </button>
      </div>
    </form>
  );
};
