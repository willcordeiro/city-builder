import { useContext } from "react";
import { ToolbarContext } from "@/providers/toolbarProvider";

export function useToolbar() {
  const context = useContext(ToolbarContext);
  if (context === undefined) {
    throw new Error("useToolbar must be used within a ToolbarProvider");
  }
  return context;
}