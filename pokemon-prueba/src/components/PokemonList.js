"use client";
import { useEffect, useState } from "react";

export default function PokemonTable({ type }) {
  const [pokemons, setPokemons] = useState([]);
  const [weakAgainst, setWeakAgainst] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 50;

  useEffect(() => {
    if (!type) return;

    const fetchData = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await res.json();

      // Lista de pokémon
      const formatted = data.pokemon.map((p) => ({
        name: p.pokemon.name,
        url: p.pokemon.url,
      }));
      const weakTypes = data.damage_relations.double_damage_from.map((t) => t.name);

      setPokemons(formatted);
      setWeakAgainst(weakTypes);
      setCurrentPage(1);
    };

    fetchData();
  }, [type]);

  // Filtrar por búsqueda
  const filteredPokemons = pokemons.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación
  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPokemons = filteredPokemons.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        className="border p-2 mb-4 w-full rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Tabla */}
      <table className="table-auto border-collapse border border-gray-300 w-full text-center">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Imagen</th>
            <th className="border border-gray-300 px-4 py-2">Débil Contra</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPokemons.map((pokemon, index) => {
            const id = pokemon.url.split("/")[6];
            const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

            return (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2 capitalize">
                  {pokemon.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex justify-center items-center h-16">
                    <img
                      src={imgUrl}
                      alt={pokemon.name}
                      className="max-h-14"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.replaceWith(
                          document.createTextNode("Imagen no encontrada")
                        );
                      }}
                    />
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {weakAgainst.length > 0
                    ? weakAgainst.join(", ")
                    : "N/A"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
