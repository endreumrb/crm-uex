import React, { useState } from 'react';
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { nanoid } from 'nanoid';
import Column from './Column';
import Card from './Card';
import Modal from './Modal';

/**
 * Kanban component for managing tasks in a board-like interface.
 * @returns {React.ReactElement} The Kanban board UI
 */
export default function Kanban() {
  const [columns, setColumns] = useState({
    'lead': { id: 'lead', title: 'Lead', cards: [] },
    'contatoFeito': { id: 'contatoFeito', title: 'Contato Feito', cards: [] },
    'aguardandoDefinicao': { id: 'aguardandoDefinicao', title: 'Aguardando definição', cards: [] },
    'propostaEnviada': { id: 'propostaEnviada', title: 'Proposta enviada', cards: [] },
    'concluido': { id: 'concluido', title: 'Concluído', cards: [] },
  });

  const [activeCard, setActiveCard] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  /**
   * Handles the start of a drag operation.
   * @param {Object} event - The drag start event
   */
  const handleDragStart = (event) => {
    const { active } = event;
    setActiveCard(active);
  };

  /**
   * Handles the end of a drag operation, updating the state accordingly.
   * @param {Object} event - The drag end event
   */
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!active || !over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeColumn = Object.values(columns).find(column => 
      column.cards.some(card => card.id === activeId)
    );
    const overColumn = Object.values(columns).find(column => 
      column.id === overId || column.cards.some(card => card.id === overId)
    );

    if (!activeColumn || !overColumn) return;

    setColumns(prevColumns => {
      const activeColumnId = activeColumn.id;
      const overColumnId = overColumn.id;

      if (activeColumnId !== overColumnId) {
        // Moving to a different column
        const activeCards = [...activeColumn.cards];
        const overCards = [...overColumn.cards];
        const activeCardIndex = activeCards.findIndex(card => card.id === activeId);
        const [movedCard] = activeCards.splice(activeCardIndex, 1);
        
        if (overId === overColumnId) {
          overCards.push(movedCard);
        } else {
          const overCardIndex = overCards.findIndex(card => card.id === overId);
          overCards.splice(overCardIndex + 1, 0, movedCard);
        }

        return {
          ...prevColumns,
          [activeColumnId]: { ...activeColumn, cards: activeCards },
          [overColumnId]: { ...overColumn, cards: overCards },
        };
      } else {
        // Reordering within the same column
        const cards = [...activeColumn.cards];
        const activeIndex = cards.findIndex(card => card.id === activeId);
        const overIndex = cards.findIndex(card => card.id === overId);
        const newCards = arrayMove(cards, activeIndex, overIndex);

        return {
          ...prevColumns,
          [activeColumnId]: { ...activeColumn, cards: newCards },
        };
      }
    });
  };

  /**
   * Adds a new card to the specified column.
   * @param {string} columnId - The ID of the column to add the card to
   */
  const addCard = (columnId) => {
    const newCard = { id: nanoid(), content: `Novo card ${nanoid(5)}` };
    setColumns(prevColumns => ({
      ...prevColumns,
      [columnId]: {
        ...prevColumns[columnId],
        cards: [...prevColumns[columnId].cards, newCard],
      },
    }));
  };

  /**
   * Removes a card from the specified column.
   * @param {string} columnId - The ID of the column to remove the card from
   * @param {string} cardId - The ID of the card to be removed
   */
  const removeCard = (columnId, cardId) => {
    setColumns(prevColumns => {
      const column = prevColumns[columnId];

      // Filtra os cards para remover o card com o ID especificado
      const updatedCards = column.cards.filter(card => card.id !== cardId);

      // Retorna o novo estado das colunas com o card removido
      return {
        ...prevColumns,
        [columnId]: {
          ...column,
          cards: updatedCards,
        },
      };
    });
  };

  /**
   * Adds a new column to the Kanban board.
   */
  const addColumn = () => {
    const newColumnId = nanoid();
    setColumns(prevColumns => ({
      ...prevColumns,
      [newColumnId]: {
        id: newColumnId,
        title: `Nova Coluna ${Object.keys(prevColumns).length + 1}`,
        cards: [],
      },
    }));
  };

  /**
   * Removes a column from the Kanban board.
   * @param {string} columnId - The ID of the column to remove
   */
  const removeColumn = (columnId) => {
    setColumns(prevColumns => {
      const newColumns = { ...prevColumns };
      delete newColumns[columnId];
      return newColumns;
    });
  };

  /**
   * Updates the title of a column.
   * @param {string} columnId - The ID of the column to update
   * @param {string} newTitle - The new title for the column
   */
  const updateColumnTitle = (columnId, newTitle) => {
    setColumns(prevColumns => ({
      ...prevColumns,
      [columnId]: {
        ...prevColumns[columnId],
        title: newTitle,
      },
    }));
  };

  /**
   * Opens the modal with details of the selected card.
   * @param {string} cardId - The ID of the card to show details for
   */
  const openModal = (cardId) => {
    setSelectedCard(cardId);
    setModalOpen(true);
  };

  return (
    <div className="p-6 bg-gray-50 flex flex-col">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Kanban</h2>
      <button
        onClick={addColumn}
        className="mb-6 px-4 py-2 w-[300px] bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        + Adicionar Coluna
      </button>
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex space-x-4 pb-8 flex-grow">
          {Object.entries(columns).map(([columnId, column]) => (
            <Column
              key={columnId}
              id={columnId}
              title={column.title}
              cards={column.cards}
              addCard={addCard}
              removeCard={removeCard}
              removeColumn={removeColumn}
              openModal={openModal}
              updateColumnTitle={updateColumnTitle}
            />
          ))}
        </div>
        <DragOverlay>
          {activeCard ? (
            <Card
              id={activeCard.id}
              content={columns[activeCard.data.current.columnId].cards.find(card => card.id === activeCard.id).content}
              isDragging={true}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h3 className="text-lg font-bold mb-2 text-gray-800">Detalhes do Card</h3>
        <p className="text-gray-600">ID do Card: {selectedCard}</p>
      </Modal>
    </div>
  );
}