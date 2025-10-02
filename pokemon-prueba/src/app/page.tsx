"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import PokemonList from "../components/PokemonList";

export default function HomePage() {
  const [selectedType, setSelectedType] = useState("");

  return (
    <div>
      <Navbar onSelectType={setSelectedType} />
      <main className="p-6 text-center">
        {selectedType ? (
          
          <PokemonList type={selectedType} />
        ) : (
          
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <h2 className="text-3xl font-bold text-gray-700">Bienvenido</h2>
          </div>
        )}
      </main>
    </div>
  );
}
