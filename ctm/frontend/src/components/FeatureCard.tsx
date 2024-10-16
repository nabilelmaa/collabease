import React from "react";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string[];
  icon: LucideIcon;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <div className="flex items-center mb-4">
        <div className="bg-primaryColor p-3 rounded-full shadow-md">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 ml-4">{title}</h3>
      </div>
      <ul className="text-gray-600 mt-2 list-disc list-inside">
        {description.map((item, index) => (
          <li key={index} className="flex items-center">
            <div className="bg-primaryColor rounded-full w-2 h-2 mr-2"></div>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureCard;
