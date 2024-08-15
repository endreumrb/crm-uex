import React from 'react';

/**
 * Modal component for displaying card details.
 * 
 * @param {Object} props - The component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 * @param {React.ReactNode} props.children - The content to display in the modal
 * @returns {React.ReactElement|null} The rendered modal or null if not open
 */
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <div className="max-h-[80vh] overflow-y-auto">
          {children}
        </div>
        <button 
          onClick={onClose} 
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}