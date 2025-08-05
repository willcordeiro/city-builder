"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ToolbarSidebarProps {
  onSelect: (id?: string | undefined) => void; // id opcional, para limpar seleção
  selectedId?: string;
}

export function ToolbarSidebar({ onSelect, selectedId }: ToolbarSidebarProps) {
  return (
    <Card className="absolute top-4 left-4 p-4 z-10 flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Ferramentas</h2>
      <Button onClick={() => onSelect("residential")} variant={selectedId === "residential" ? "default" : "outline"}>
        Residencial
      </Button>
      <Button onClick={() => onSelect("commercial")} variant={selectedId === "commercial" ? "default" : "outline"}>
        Comercial
      </Button>
      <Button onClick={() => onSelect("industrial")} variant={selectedId === "industrial" ? "default" : "outline"}>
        Industrial
      </Button>
      <Button onClick={() => onSelect("road")} variant={selectedId === "road" ? "default" : "outline"}>
        Estrada
      </Button>
      <Button onClick={() => onSelect("bulldoze")} variant={selectedId === "bulldoze" ? "destructive" : "outline"}>
        Demolir
      </Button>
      <Button onClick={() => onSelect(undefined)} variant="secondary">
        Limpar Seleção
      </Button>
    </Card>
  );
}
