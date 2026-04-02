import React, { createContext, useContext, useState } from "react";

// 1. Create the Context
const AccordionContext = createContext();

const Accordion = ({ children, allowMultiple = false }) => {
  // openIds can be a string (single) or an array (multiple)
  const [openIds, setOpenIds] = useState(allowMultiple ? [] : null);

  const toggleItem = (id) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
      );
    } else {
      setOpenIds((prev) => (prev === id ? null : id));
    }
  };

  const isOpen = (id) =>
    allowMultiple ? openIds.includes(id) : openIds === id;

  return (
    <AccordionContext.Provider value={{ toggleItem, isOpen }}>
      <div className="m-4 flex w-full max-w-xl flex-col gap-2 rounded-md bg-neutral-800 p-4 text-white">
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

// 2. Accordion.Item - Simply provides the ID to children via another small context or props
const ItemContext = createContext();

Accordion.Item = function AccordionItem({ id, children }) {
  return (
    <ItemContext.Provider value={id}>
      <div className="border-b border-neutral-700 last:border-0">
        {children}
      </div>
    </ItemContext.Provider>
  );
};

// 3. Accordion.Header - The trigger
Accordion.Header = function AccordionHeader({ children }) {
  const id = useContext(ItemContext);
  const { toggleItem, isOpen } = useContext(AccordionContext);
  const active = isOpen(id);

  return (
    <button
      onClick={() => toggleItem(id)}
      className="flex w-full items-center justify-between py-3 font-semibold transition-colors hover:text-blue-400"
    >
      <span>{children}</span>
      <span
        className={`transition-transform duration-300 ${active ? "rotate-180" : ""}`}
      >
        ▼
      </span>
    </button>
  );
};

// 4. Accordion.Body - The animated content
Accordion.Body = function AccordionBody({ children }) {
  const id = useContext(ItemContext);
  const { isOpen } = useContext(AccordionContext);
  const active = isOpen(id);

  return (
    <div
      className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
        active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        <div className="pb-4 text-sm text-neutral-300">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
