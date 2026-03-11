import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import EmployeeCard from "./EmployeeCard";

function Column({ column, selected, handleSelect }) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        width: 250,
        minHeight: 300,
        padding: 10,
        borderRadius: 8,
        background: isOver ? "#e6f7ff" : "#f4f4f4",
      }}
    >
      <h3>{column.title}</h3>

      <SortableContext
        items={column.employees.map((emp) => emp.id)}
        strategy={verticalListSortingStrategy}
      >
        {column.employees.map((emp) => (
          <EmployeeCard
            key={emp.id}
            employee={emp}
            selected={selected.includes(emp.id)}
            handleSelect={handleSelect}
          />
        ))}
      </SortableContext>
    </div>
  );
}

export default Column;
