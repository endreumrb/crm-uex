import React from 'react';
import TaskStatusChart from '@/components/Charts/TaskStatusChart';
import TaskProgressChart from '@/components/Charts/TaskProgressChart';

/**
 * Dashboard component displaying CRM analytics.
 * 
 * @returns {React.ReactElement} The rendered dashboard
 */
export default function DashboardPage() {
  // Dados simulados para o estado das tarefas no Kanban
  const taskStatusData = [
    { status: 'Lead', count: 15 },
    { status: 'Contato Feito', count: 8 },
    { status: 'Aguardando definição', count: 5 },
    { status: 'Proposta enviada', count: 3 },
    { status: 'Concluído', count: 7 },
  ];

  // Dados simulados para o progresso das tarefas ao longo do tempo
  const taskProgressData = [
    { week: 'Semana 1', newLeads: 5, contactsMade: 3, proposalsSent: 1, deals: 0 },
    { week: 'Semana 2', newLeads: 7, contactsMade: 4, proposalsSent: 2, deals: 1 },
    { week: 'Semana 3', newLeads: 6, contactsMade: 5, proposalsSent: 3, deals: 2 },
    { week: 'Semana 4', newLeads: 8, contactsMade: 6, proposalsSent: 4, deals: 3 },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-full">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard CRM</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <TaskStatusChart data={taskStatusData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <TaskProgressChart data={taskProgressData} />
        </div>
      </div>
    </div>
  );
}