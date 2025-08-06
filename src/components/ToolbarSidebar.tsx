"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, Store, Factory, Car, Trash2, XCircle, Camera, CameraOff } from 'lucide-react'; // Import CameraOff icon

interface CityBuilderToolbarProps {
  onSelect: (id?: string | undefined) => void; // id opcional, para limpar seleção
  selectedId?: string;
  onToggleIsometric: () => void; // Renamed prop for toggling isometric view
  isIsometricActive: boolean; // New prop to indicate if isometric view is active
}

export function ToolbarSidebar({
  onSelect,
  selectedId,
  onToggleIsometric, // Destructure new prop
  isIsometricActive, // Destructure new prop
}: CityBuilderToolbarProps) {
  // Define os itens da barra de ferramentas com seus ícones e sub-opções
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
      id: "camera-toggle", // Changed ID to be more generic for toggle
      label: isIsometricActive ? "Visão Normal" : "Visão Isométrica", // Change label based on state
      icon: isIsometricActive ? CameraOff : Camera, // Change icon based on state
      action: onToggleIsometric, // Direct action for this button
    },
  ];

  return (
    <Card className="fixed bottom-4 left-1/2 -translate-x-1/2 p-3 z-10 flex flex-row gap-2 items-center shadow-lg">
      {toolbarItems.map((item) => {
        // Check if any sub-item of this group is selected (or the item itself if no sub-options)
        const isSelected = item.subOptions
          ? item.subOptions.some((sub) => sub.id === selectedId)
          : item.id === selectedId;
        // Define the main button variant, applying 'destructive' for 'Demolir' if selected
        const buttonVariant =
          item.id === "bulldoze" && isSelected
            ? "destructive"
            : isSelected
            ? "default"
            : "outline";

        if (item.action) {
          // Render a simple button for direct actions like camera change
          return (
            <Button
              key={item.id}
              onClick={item.action} // Call the direct action
              variant={item.id === "camera-toggle" && isIsometricActive ? "default" : "outline"} // Highlight if active
              size="icon"
              className="flex flex-col h-auto w-auto p-3"
            >
              <item.icon className="h-6 w-6" />
            </Button>
          );
        } else if (!item.subOptions) {
          // Render a simple button if no sub-options
          return (
            <Button
              key={item.id}
              onClick={() => onSelect(item.id)}
              variant={buttonVariant}
              size="icon"
              className="flex flex-col h-auto w-auto p-3" // Aumenta o padding do botão
            >
              <item.icon className="h-6 w-6" />{" "}
              {/* Aumenta o tamanho do ícone */}
            </Button>
          );
        }
        // Render a DropdownMenu if there are sub-options
        return (
          <DropdownMenu key={item.id}>
            <DropdownMenuTrigger asChild>
              <Button
                variant={buttonVariant}
                size="icon"
                className="flex flex-col h-auto w-auto p-3" // Aumenta o padding do botão
              >
                <item.icon className="h-6 w-6" />{" "}
                {/* Aumenta o tamanho do ícone */}
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
      {/* Button to clear selection */}
      <Button
        onClick={() => onSelect(undefined)}
        variant="secondary"
        size="icon"
        className="flex flex-col h-auto w-auto p-3 ml-4" // Aumenta o padding do botão
      >
        <XCircle className="h-6 w-6" /> {/* Aumenta o tamanho do ícone */}
      </Button>
    </Card>
  );
}
