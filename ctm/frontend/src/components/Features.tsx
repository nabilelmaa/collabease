import React from "react";
import FeatureCard from "./FeatureCard";
import { Users, ListTodo, Layout } from "lucide-react";

const Features = () => {
  const features = [
    {
      title: "Real-time Collaboration",
      description: [
        "Seamlessly work together.",
        "Instant notifications.",
        "Chat support.",
      ],
      icon: Users,
    },
    {
      title: "Advanced Task Management",
      description: [
        "Organize and prioritize tasks.",
        "Deadline tracking.",
        "Status updates.",
      ],
      icon: ListTodo,
    },
    {
      title: "Customizable Workspaces",
      description: [
        "Tailor your environment.",
        "Theme options.",
        "Layout adjustments.",
      ],
      icon: Layout,
    },
  ];

  return (
    <section
      id="features"
      className="py-12 bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 light:text-gray-900">
          Powerful Features for Enhanced Productivity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
