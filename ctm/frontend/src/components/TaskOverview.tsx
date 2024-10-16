import React from "react";

interface TaskSummaryProps {
  tasksInProgress: number;
  completedTasks: number;
  upcomingDeadlines: number;
  priorityLevels: {
    high: number;
    medium: number;
    low: number;
  };
}

const TaskOverview: React.FC<TaskSummaryProps> = ({
  tasksInProgress,
  completedTasks,
  upcomingDeadlines,
  priorityLevels,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Tasks in Progress */}
      <div className="p-6 rounded-lg shadow bg-white dark:bg-gray-800">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Tasks in Progress
        </h3>
        <p className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
          {tasksInProgress}
        </p>
      </div>

      {/* Completed Tasks */}
      <div className="p-6 rounded-lg shadow bg-white dark:bg-gray-800">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Completed Tasks
        </h3>
        <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
          {completedTasks}
        </p>
      </div>

      {/* Upcoming Deadlines */}
      <div className="p-6 rounded-lg shadow bg-white dark:bg-gray-800">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Upcoming Deadlines
        </h3>
        <p className="mt-2 text-3xl font-bold text-red-600 dark:text-red-400">
          {upcomingDeadlines}
        </p>
      </div>

      {/* Task Priority Levels */}
      <div className="p-6 rounded-lg shadow bg-white dark:bg-gray-800">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Priority Levels
        </h3>
        <div className="mt-2">
          <p className="text-sm text-red-600 dark:text-red-400">
            High: {priorityLevels.high}
          </p>
          <p className="text-sm text-yellow-600 dark:text-yellow-400">
            Medium: {priorityLevels.medium}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Low: {priorityLevels.low}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskOverview;
