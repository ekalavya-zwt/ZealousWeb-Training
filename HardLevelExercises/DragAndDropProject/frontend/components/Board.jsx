import React, { useState, useEffect } from "react";
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import Column from "./Column";
import EmployeeCard from "./EmployeeCard";

const STORAGE_KEY = "kanban-board-state";

const initialBoard = {
  engineering: {
    id: "engineering",
    title: "Engineering",
    employees: [
      { id: "1", name: "John" },
      { id: "2", name: "Sara" },
    ],
  },
  hr: {
    id: "hr",
    title: "HR",
    employees: [],
  },
  sales: {
    id: "sales",
    title: "Sales",
    employees: [{ id: "3", name: "Mike" }],
  },
};

function Board() {
  const [board, setBoard] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialBoard;
  });
  const [activeId, setActiveId] = useState(null);
  const [selected, setSelected] = useState([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );

  const findColumn = (employeeId) => {
    return Object.values(board).find((col) =>
      col.employees.some((emp) => emp.id === employeeId),
    );
  };

  const handleSelect = (e, id) => {
    if (e.shiftKey) {
      setSelected((prev) => (prev.includes(id) ? prev : [...prev, id]));
    } else {
      setSelected([id]);
    }
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const sourceCol = findColumn(active.id);
    const targetCol =
      Object.values(board).find((c) => c.id === over.id) || findColumn(over.id);

    if (!sourceCol || !targetCol) return;

    const draggedIds = selected.includes(active.id) ? selected : [active.id];

    if (sourceCol.id === targetCol.id) {
      const oldIndex = sourceCol.employees.findIndex(
        (emp) => emp.id === active.id,
      );

      const newIndex = sourceCol.employees.findIndex(
        (emp) => emp.id === over.id,
      );

      const reordered = arrayMove(sourceCol.employees, oldIndex, newIndex);

      setBoard((prev) => ({
        ...prev,
        [sourceCol.id]: {
          ...sourceCol,
          employees: reordered,
        },
      }));
    } else {
      const movingEmployees = sourceCol.employees.filter((emp) =>
        draggedIds.includes(emp.id),
      );

      setBoard((prev) => ({
        ...prev,

        [sourceCol.id]: {
          ...sourceCol,
          employees: sourceCol.employees.filter(
            (emp) => !draggedIds.includes(emp.id),
          ),
        },

        [targetCol.id]: {
          ...targetCol,
          employees: [...targetCol.employees, ...movingEmployees],
        },
      }));
    }

    setSelected([]);
    setActiveId(null);
  };

  const activeEmployee = Object.values(board)
    .flatMap((col) => col.employees)
    .find((emp) => emp.id === activeId);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
  }, [board]);

  return (
    <>
      <button
        onClick={() => {
          localStorage.removeItem(STORAGE_KEY);
          location.reload();
        }}
        style={{ marginBottom: "10px", cursor: "pointer" }}
      >
        Reset Board
      </button>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div style={{ display: "flex", gap: 20 }}>
          {Object.values(board).map((column) => (
            <Column
              key={column.id}
              column={column}
              selected={selected}
              handleSelect={handleSelect}
            />
          ))}
        </div>

        <DragOverlay>
          {activeEmployee ? <EmployeeCard employee={activeEmployee} /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}

export default Board;
