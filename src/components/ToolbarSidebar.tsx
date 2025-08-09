"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToolbar } from "@/hooks/useTollbar";
import {
  Home,
  Store,
  Factory,
  Car,
  Trash2,
  Camera,
  CameraOff,
  RefreshCcw,
} from "lucide-react";

interface CityBuilderToolbarProps {
  onResetCamera: () => void;
}

export function ToolbarSidebar({ onResetCamera }: CityBuilderToolbarProps) {
  const { selectedToolId, toggleToolSelect, isIsometric, toggleIsometricView } =
    useToolbar();

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
      label: isIsometric ? "Visão Normal" : "Visão Isométrica",
      icon: isIsometric ? CameraOff : Camera,
      action: toggleIsometricView,
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
          ? item.subOptions.some((sub) => sub.id === selectedToolId)
          : item.id === selectedToolId;

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
              variant={
                item.id === "camera-toggle" && isIsometric
                  ? "default"
                  : "outline"
              }
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
              onClick={() => toggleToolSelect(item.id)}
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
                  onClick={() => toggleToolSelect(subOption.id)}
                  className={
                    selectedToolId === subOption.id
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
    </Card>
  );
}
