"use client";
import React, { createContext, useContext, useRef, useState } from "react";

type SelectionContextType = {
  selectedIds: Set<string>;
  registerItem: (id: string, rect: DOMRect) => void;
};

const SelectionContext = createContext<SelectionContextType | null>(null);

export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const itemsRef = useRef<Map<string, DOMRect>>(new Map());

  const startPoint = useRef<{ x: number; y: number } | null>(null);

  const registerItem = (id: string, rect: DOMRect) => {
    itemsRef.current.set(id, rect);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    startPoint.current = { x: e.clientX, y: e.clientY };
    setSelectedIds(new Set());
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!startPoint.current) return;

    const x1 = Math.min(startPoint.current.x, e.clientX);
    const y1 = Math.min(startPoint.current.y, e.clientY);
    const x2 = Math.max(startPoint.current.x, e.clientX);
    const y2 = Math.max(startPoint.current.y, e.clientY);

    const newSelection = new Set<string>();

    itemsRef.current.forEach((rect, id) => {
      const intersects =
        rect.right >= x1 &&
        rect.left <= x2 &&
        rect.bottom >= y1 &&
        rect.top <= y2;

      if (intersects) newSelection.add(id);
    });

    setSelectedIds(newSelection);
  };

  const onMouseUp = () => {
    startPoint.current = null;
  };

  return (
    <SelectionContext.Provider value={{ selectedIds, registerItem }}>
      <div
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        style={{ position: "relative" }}
      >
        {children}
      </div>
    </SelectionContext.Provider>
  );
}

export const useSelection = () => {
  const ctx = useContext(SelectionContext);
  if (!ctx)
    throw new Error("useSelection must be used inside SelectionProvider");
  return ctx;
};
