import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function EmployeeCard({ employee, selected, handleSelect }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: employee.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: 10,
    marginBottom: 8,
    borderRadius: 6,
    background: selected ? "#cce5ff" : "white",
    border: selected ? "2px solid #1890ff" : "1px solid #ddd",
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={(e) => handleSelect(e, employee.id)}
      {...attributes}
      {...listeners}
      tabIndex={0}
    >
      {employee.name}
    </div>
  );
}

export default EmployeeCard;
