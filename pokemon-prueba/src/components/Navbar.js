"use client";
import { useEffect, useState } from "react";

export default function Navbar({ onSelectType }) {
  const [tipos, setTipos] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("Tipos ▼"); 
  useEffect(() => {
    async function fetchTipos() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/type");
        const data = await res.json();
        setTipos(data.results);
      } catch (error) {
        console.error("Error al cargar tipos de Pokémon", error);
      }
    }
    fetchTipos();
  }, []);

  return (
    <nav className="bg-red-600 text-white p-4 flex justify-between items-center relative">
      {/* Logo */}
      <h1 className="text-xl font-bold">Prueba</h1>

      {/* Dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="bg-red-700 px-4 py-2 rounded-lg hover:bg-red-800"
        >
          {selectedType} {/* 👈 Ahora el texto cambia */}
        </button>

        {open && (
          <ul className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg max-h-64 overflow-y-auto z-10">
            {tipos.map((tipo, i) => (
              <li
                key={i}
                onClick={() => {
                  onSelectType(tipo.name);
                  setSelectedType(tipo.name.toUpperCase());
                  setOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                {tipo.name.toUpperCase()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
