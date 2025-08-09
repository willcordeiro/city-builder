import ThreeScene from "@/components/ThreeScene";
import CityProvider from "@/providers/cityProvider";
import { ToolbarProvider } from "@/providers/toolbarProvider";

export default function Home() {
  const gridSize = 16; // Define o tamanho do grid

  return (
    <CityProvider size={gridSize}>
      <ToolbarProvider>
        <ThreeScene size={gridSize} />
      </ToolbarProvider>
    </CityProvider>
  );
}
