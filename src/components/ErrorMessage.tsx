import React from "react";
import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="flex items-center gap-2 p-4 mb-6 text-red-700 bg-red-100 rounded-lg border border-red-200">
    <AlertCircle className="h-5 w-5" />
    <p>{message}</p>
  </div>
);
