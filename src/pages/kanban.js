import React from 'react';
import Kanban from '../components/Kanban';

/**
 * KanbanPage component that renders the Kanban board.
 * 
 * @returns {React.ReactElement} The rendered Kanban page
 */
export default function KanbanPage() {
  return (
    <div className='m-4 h-full flex flex-col'>
      <div className="flex h-full w-full">
        <Kanban />
      </div>
    </div>
  );
}