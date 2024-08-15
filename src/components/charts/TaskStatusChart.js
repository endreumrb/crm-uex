import React from 'react';
import dynamic from 'next/dynamic';
import { Series, Label, Legend, Export, Tooltip } from 'devextreme-react/chart';

const PieChart = dynamic(() => import('devextreme-react/pie-chart'), { ssr: false });

/**
 * TaskStatusChart component displays a pie chart of task distribution by status.
 * 
 * @param {Object} props - The component props
 * @param {Array} props.data - The data for the chart
 * @returns {React.ReactElement} The rendered chart
 */
export default function TaskStatusChart({ data }) {
  return (
    <PieChart
      id="task-status-chart"
      dataSource={data}
      title="Distribuição de Tarefas por Status"
      palette="Bright"
    >
      <Series argumentField="status" valueField="count">
        <Label visible={true} format="fixedPoint" />
      </Series>
      <Legend
        visible={true}
        horizontalAlignment="center"
        verticalAlignment="bottom"
      />
      <Export enabled={true} />
      <Tooltip enabled={true} />
    </PieChart>
  );
}