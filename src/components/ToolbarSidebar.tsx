import React from "react";
import { TOOL_DEFINITIONS } from "../utils/tool-constants";

export interface ToolbarSidebarProps {
  onSelect: (id: string) => void;
  selectedId: string;
}

export function ToolbarSidebar({ onSelect, selectedId }: ToolbarSidebarProps) {
  return (
    <aside
      style={{
        width: 90,
        background: "#222",
        color: "#fff",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 32,
        boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 10,
      }}
    >
      {TOOL_DEFINITIONS.map((tool) => (
        <button
          key={tool.id}
          onClick={() => onSelect(tool.id) }
          style={{
            width: 64,
            height: 64,
            margin: "14px 0",
            borderRadius: 16,
            border:
              selectedId === tool.id
                ? `3px solid ${tool.color}`
                : "2px solid #444",
            background: selectedId === tool.id ? tool.color : "#333",
            boxShadow:
              selectedId === tool.id
                ? `0 0 16px ${tool.color}`
                : "0 2px 8px #111",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 22,
            cursor: "pointer",
            outline: "none",
            transition: "all 0.2s",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 32, marginBottom: 4 }}>{tool.icon}</span>
          <span style={{ fontSize: 13 }}>{tool.name}</span>
        </button>
      ))}
    </aside>
  );
}
