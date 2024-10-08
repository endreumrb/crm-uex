import React, { useState, useRef, useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Card from './Card';

export default function Column({ id, title, cards, addCard, removeCard, removeColumn, openModal, updateColumnTitle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const { setNodeRef } = useDroppable({ id });
  const inputRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        handleTitleSubmit();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [newTitle]);

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleTitleSubmit = () => {
    if (newTitle.trim() !== '') {
      updateColumnTitle(id, newTitle);
    } else {
      setNewTitle(title); // Reset to original title if empty
    }
    setIsEditing(false);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      handleTitleSubmit();
    } else if (e.key === 'Escape') {
      setNewTitle(title); // Reset to original title
      setIsEditing(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 p-4 rounded-lg shadow-md min-w-[300px] max-w-[300px]"
    >
      {isEditing ? (
        <form ref={formRef} onSubmit={(e) => { e.preventDefault(); handleTitleSubmit(); }} className="flex mb-3">
          <input
            ref={inputRef}
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            onKeyDown={handleInputKeyDown}
            className="flex-grow mr-2 px-2 py-1 border rounded text-gray-800"
          />
          <button
            type="submit"
            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
          >
            ✓
          </button>
        </form>
      ) : (
        <h3 className="font-bold mb-3 flex justify-between items-center text-gray-700">
          <span onClick={() => setIsEditing(true)}>{title}</span>
          <button
            onClick={() => removeColumn(id)}
            className="text-red-500 hover:text-red-700 transition duration-300"
          >
            ✕
          </button>
        </h3>
      )}
      <button
        onClick={() => addCard(id)}
        className="mb-3 w-full px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
      >
        + Adicionar Card
      </button>
      <SortableContext items={cards.map(card => card.id)} strategy={verticalListSortingStrategy}>
        {cards.map((card) => (
          <Card key={card.id} {...card} columnId={id} openModal={openModal} removeCard={removeCard} />
        ))}
      </SortableContext>
    </div>
  );
}