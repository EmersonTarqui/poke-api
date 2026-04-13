"use client";
import { useState, use } from "react"; 
import PokemonCard from "./_components/pokemon-card";

interface Pokemon {
  name: string;
  id: number;
}

const apiPokemon = fetch('https://pokeapi.co/api/v2/pokemon?limit=151').then((res) => {
  return res.json();
});

export default function PokemonsPage() {
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1); 
  
  const itensPorPagina = 15; 

  const data = use(apiPokemon); 

  const pokemons: Pokemon[] = data.results.map((p: { name: string }, i: number) => {
    return { name: p.name, id: i + 1 };
  });

  const listaFiltrada = pokemons.filter((p) => 
    p.name.includes(busca.toLowerCase()) || p.id == Number(busca)
  );

  //paginacao
  const final = pagina * itensPorPagina;
  const começo = final - itensPorPagina;
  const exibidos = listaFiltrada.slice(começo, final);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto text-center">
        
        <h1 className="text-4xl font-bold mb-8 italic tracking-tighter uppercase">Pokédex</h1>

        <input
          type="text"
          placeholder="Buscar Pokémon por nome ou ID..."
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
            setPagina(1); // Volta para a página 1 ao buscar
          }}
          className="w-full p-4 mb-10 bg-zinc-900 border border-zinc-800 rounded-xl outline-none focus:border-zinc-500"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
          {exibidos.map((pokemon) => (
            <PokemonCard key={pokemon.id} id={pokemon.id} name={pokemon.name} />
          ))}
        </div>

        {/* botoes */}
        <div className="flex justify-center items-center gap-6 mt-12 pb-10">
          
          <button 
            disabled={pagina === 1}
            onClick={() => setPagina(pagina - 1)}
            className="px-8 py-3 bg-zinc-900 border border-zinc-800 rounded-xl font-bold uppercase text-xs disabled:opacity-20 hover:bg-zinc-800 transition-all active:scale-95"
          >
            Anterior
          </button>

          <span className="text-zinc-500 font-bold">Página {pagina}</span>

          <button 
            disabled={final >= listaFiltrada.length}
            onClick={() => setPagina(pagina + 1)}
            className="px-8 py-3 bg-zinc-900 border border-zinc-800 rounded-xl font-bold uppercase text-xs disabled:opacity-20 hover:bg-zinc-800 transition-all active:scale-95"
          >
            Próximo
          </button>

        </div>
      </div>
    </div>
  );
}