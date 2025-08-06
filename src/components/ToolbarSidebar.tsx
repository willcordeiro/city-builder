"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  Store,
  Factory,
  Car,
  Trash2,
  XCircle,
  Camera,
  CameraOff,
  RefreshCcw, // ícone para resetar a câmera
} from "lucide-react";

interface CityBuilderToolbarProps {
  onSelect: (id?: string | undefined) => void;
  selectedId?: string;
  onToggleIsometric: () => void;
  isIsometricActive: boolean;
  onResetCamera: () => void; // 🆕 nova prop
}

export function ToolbarSidebar({
  onSelect,
  selectedId,
  onToggleIsometric,
  isIsometricActive,
  onResetCamera,
}: CityBuilderToolbarProps) {
  const toolbarItems = [
    {
      id: "residential",
      label: "Residencial",
      icon: Home,
      subOptions: [
        { id: "residential", label: "Casa Pequena" },
        { id: "residentialLarge", label: "Casa Grande" },
        { id: "residentialApartment", label: "Apartamento" },
      ],
    },
    {
      id: "commercial",
      label: "Comercial",
      icon: Store,
      subOptions: [
        { id: "commercialSmall", label: "Loja Pequena" },
        { id: "commercialRestaurant", label: "Restaurante" },
        { id: "commercialOffice", label: "Escritório" },
      ],
    },
    {
      id: "industrial",
      label: "Industrial",
      icon: Factory,
      subOptions: [
        { id: "industrialHeavy", label: "Indústria Pesada" },
        { id: "industrialLight", label: "Indústria Leve" },
        { id: "industrialWarehouse", label: "Armazém" },
      ],
    },
    {
      id: "road",
      label: "Estrada",
      icon: Car,
    },
    {
      id: "bulldoze",
      label: "Demolir",
      icon: Trash2,
    },
    {
      id: "camera-toggle",
      label: isIsometricActive ? "Visão Normal" : "Visão Isométrica",
      icon: isIsometricActive ? CameraOff : Camera,
      action: onToggleIsometric,
    },
    {
      id: "reset-camera",
      label: "Resetar Câmera",
      icon: RefreshCcw,
      action: onResetCamera,
    },
  ];

  return (
    <Card className="fixed bottom-4 left-1/2 -translate-x-1/2 p-3 z-10 flex flex-row gap-2 items-center shadow-lg">
      {toolbarItems.map((item) => {
        const isSelected = item.subOptions
          ? item.subOptions.some((sub) => sub.id === selectedId)
          : item.id === selectedId;

        const buttonVariant =
          item.id === "bulldoze" && isSelected
            ? "destructive"
            : isSelected
            ? "default"
            : "outline";

        if (item.action) {
          return (
            <Button
              key={item.id}
              onClick={item.action}
              variant={item.id === "camera-toggle" && isIsometricActive ? "default" : "outline"}
              size="icon"
              className="flex flex-col h-auto w-auto p-3"
            >
              <item.icon className="h-6 w-6" />
            </Button>
          );
        } else if (!item.subOptions) {
          return (
            <Button
              key={item.id}
              onClick={() => onSelect(item.id)}
              variant={buttonVariant}
              size="icon"
              className="flex flex-col h-auto w-auto p-3"
            >
              <item.icon className="h-6 w-6" />
            </Button>
          );
        }

        return (
          <DropdownMenu key={item.id}>
            <DropdownMenuTrigger asChild>
              <Button
                variant={buttonVariant}
                size="icon"
                className="flex flex-col h-auto w-auto p-3"
              >
                <item.icon className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="center">
              {item.subOptions.map((subOption) => (
                <DropdownMenuItem
                  key={subOption.id}
                  onClick={() => onSelect(subOption.id)}
                  className={
                    selectedId === subOption.id
                      ? "bg-accent text-accent-foreground"
                      : ""
                  }
                >
                  {subOption.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}
      <Button
        onClick={() => onSelect(undefined)}
        variant="secondary"
        size="icon"
        className="flex flex-col h-auto w-auto p-3 ml-4"
      >
        <XCircle className="h-6 w-6" />
      </Button>
    </Card>
  );
}
