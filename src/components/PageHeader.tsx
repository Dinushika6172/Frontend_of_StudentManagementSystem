import React from "react";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  description?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  icon: Icon,
  title,
  description,
}) => (
  <div className="bg-hero-pattern bg-cover bg-center py-16 mb-8">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-white flex items-center gap-3 mb-3">
        <Icon className="h-10 w-10" />
        {title}
      </h1>
      {description && (
        <p className="text-white text-xl opacity-90">{description}</p>
      )}
    </div>
  </div>
);
