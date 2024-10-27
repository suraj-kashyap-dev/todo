import React from 'react';
import { PlusCircle, Clock, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Task {
  id: number;
  title: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  const tasks: Task[] = [
    {
      id: 1,
      title: 'Complete project proposal',
      priority: 'high',
      dueDate: '2024-10-20',
    },
    {
      id: 2,
      title: 'Review team submissions',
      priority: 'medium',
      dueDate: '2024-10-21',
    },
    {
      id: 3,
      title: 'Update documentation',
      priority: 'low',
      dueDate: '2024-10-22',
    },
  ];

  return (
    <React.Fragment>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t('dashboard')}</h2>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          <PlusCircle className="h-5 w-5" />
          {t('addTask')}
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-orange-600">
              <Clock className="h-5 w-5" />
              <h3 className="font-semibold">{t('dueSoon')}</h3>
            </div>
            <p className="text-2xl font-bold">5 {t('tasks')}</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <h3 className="font-semibold">{t('highPriority')}</h3>
            </div>
            <p className="text-2xl font-bold">3 {t('tasks')}</p>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-4">
            <h3 className="font-semibold">{t('recentTasks')}</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <span>{task.title}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`
                    px-2 py-1 rounded-full text-sm
                    ${
                      task.priority === 'high'
                        ? 'bg-red-100 text-red-700'
                        : task.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                    }
                  `}
                    >
                      {t(`priority.${task.priority}`)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {task.dueDate}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                {t('noTasks')}
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
