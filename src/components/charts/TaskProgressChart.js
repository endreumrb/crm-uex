import React from 'react';
import dynamic from 'next/dynamic';
import { Series, Legend, Export, Tooltip } from 'devextreme-react/chart';

const Chart = dynamic(() => import('devextreme-react/chart'), { ssr: false });

/**
 * TaskProgressChart component displays a stacked bar chart of task progress over time.
 * 
 * @param {Object} props - The component props
 * @param {Array} props.data - The data for the chart
 * @returns {React.ReactElement} The rendered chart
 */
export default function TaskProgressChart({ data }) {
  return (
    <Chart
      id="task-progress-chart"
      dataSource={data}
      title="Progresso das Tarefas ao Longo do Tempo"
    >
      <Series
        valueField="newLeads"
        argumentField="week"
        name="Novos Leads"
        type="stackedBar"
      />
      <Series
        valueField="contactsMade"
        argumentField="week"
        name="Contatos Feitos"
        type="stackedBar"
      />
      <Series
        valueField="proposalsSent"
        argumentField="week"
        name="Propostas Enviadas"
        type="stackedBar"
      />
      <Series
        valueField="deals"
        argumentField="week"
        name="Negócios Fechados"
        type="stackedBar"
      />
      <Legend visible={true} />
      <Export enabled={true} />
      <Tooltip enabled={true} />
    </Chart>
  );
}