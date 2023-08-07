"use client";
import React from "react";
import { useState, useEffect } from "react";

type ListItemProps = {
  children: React.ReactNode;
  id: string;
  onHover: (id: string) => void;
  isActive?: boolean;
};

export default function ListItem({ children, id, onHover, isActive }: ListItemProps) {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isHovering) {
      onHover(id);
    }
  }, [isHovering]);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="list-item"
      data-active={isActive}
    >
      {children}
    </div>
  );
}
