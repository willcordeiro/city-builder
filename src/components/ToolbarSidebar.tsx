"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, Store, Factory, Car, Trash2, XCircle } from "lucide-react"; // Importa os ícones necessários

interface CityBuilderToolbarProps {
  onSelect: (id?: string | undefined) => void; // id opcional, para limpar seleção
  selectedId?: string;
}

export function ToolbarSidebar({
  onSelect,
  selectedId,
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
  ];

  return (
    <Card className="fixed bottom-4 left-1/2 -translate-x-1/2 p-3 z-10 flex flex-row gap-2 items-center shadow-lg">
      {toolbarItems.map((item) => {
        // Verifica se algum sub-item deste grupo está selecionado (ou o próprio item se não tiver sub-opções)
        const isSelected = item.subOptions
          ? item.subOptions.some((sub) => sub.id === selectedId)
          : item.id === selectedId;

        // Define a variante do botão principal, aplicando 'destructive' para 'Demolir' se selecionado
        const buttonVariant =
          item.id === "bulldoze" && isSelected
            ? "destructive"
            : isSelected
            ? "default"
            : "outline";

        if (!item.subOptions) {
          // Renderiza um botão simples se não houver sub-opções
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

        // Renderiza um DropdownMenu se houver sub-opções
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
      {/* Botão para limpar a seleção */}
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
