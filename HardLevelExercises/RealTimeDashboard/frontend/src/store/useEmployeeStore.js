import React from "react";
import { create } from "zustand";

export const useEmployeeStore = create((set) => ({
  employees: [],

  setEmployees: (employees) => set(() => ({ employees })),

  addEmployee: (emp) =>
    set((state) => ({
      employees: [...state.employees, emp],
    })),

  updateSalary: (id, salary) =>
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === id ? { ...emp, salary } : emp,
      ),
    })),

  deleteEmployee: (id) =>
    set((state) => ({
      employees: state.employees.filter((emp) => emp.id !== id),
    })),
}));
