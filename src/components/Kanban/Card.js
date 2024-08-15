import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

/**
 * Card component for individual tasks in the Kanban board.
 * 
 * @param {Object} props - The component props
 * @param {string} props.id - Unique identifier for the card
 * @param {string} props.content - The content of the card
 * @param {string} props.columnId - The ID of the column this card belongs to
 * @param {Function} props.openModal - Function to open the card details modal
 * @param {boolean} props.isDragging - Whether the card is currently being dragged
 * @returns {React.ReactElement} The rendered card
 */
export default function Card({ id, content, columnId, openModal, removeCard, isDragging }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id, data: { columnId } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    boxShadow: isDragging ? '0 0 10px rgba(0, 0, 0, 0.3)' : 'none',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white p-4 mb-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ${
        isDragging ? 'z-10' : ''
      }`}
    >
      <div className="flex items-center">
        <div
          {...attributes}
          {...listeners}
          className="cursor-move p-1 mr-2 text-gray-400 hover:text-gray-600"
        >
          <GripVertical size={20} />
        </div>
        <div className="flex-grow">
          <p className="text-gray-800">{content}</p>
          <button
            onClick={() => openModal(id)}
            className="mt-2 px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition duration-300"
          >
            Detalhes
          </button>
        </div>
        <button
            onClick={() => removeCard(columnId, id)}
            className="text-red-500 hover:text-red-700 transition duration-300"
          >
            ✕
          </button>
      </div>
    </div>
  );
}