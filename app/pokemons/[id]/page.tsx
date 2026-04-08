import Link from "next/link";

interface PokemonDetail {
  name: string;
  sprites: {
    versions: {
      "generation-v": {
        "black-white": {
          animated: {
            front_default: string;
          };
        };
      };
    };
  };
  types: { type: { name: string } }[];
}

export default async function PokemonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const pokemon: PokemonDetail = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => {
    return res.json();
  });

  const pokemonGifUrl = pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default;

  return (
  //  container 
    <div className="min-h-screen bg-black text-white p-6 sm:p-8 font-sans flex items-center justify-center">
      
      {/* card */}
      <div className="w-full max-w-md text-center border border-zinc-900 rounded-[3rem] p-8 sm:p-12 bg-zinc-950 shadow-2xl">

        {/* header */}
        <h1 className="text-5xl font-black capitalize italic text-white tracking-tighter mb-2">
          {pokemon.name}
        </h1>
        <p className="text-zinc-500 font-mono text-x uppercase tracking-widest mb-10">
          ID: #{String(id).padStart(3, '0')}
        </p>
        
        {/* pokebola */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto rounded-full border-[10px] border-black overflow-hidden flex items-center justify-center bg-white shadow-lg mb-10">
          
          <div className="absolute top-0 w-full h-1/2 bg-red-600"></div>
          
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-[14px] bg-black"></div>

          {/* pokemon */}
          <div className="relative z-10 w-36 h-36 sm:w-40 sm:h-40 bg-white rounded-full border-[10px] border-black flex items-center justify-center">  
            <img 
              src={pokemonGifUrl} 
              alt={pokemon.name} 
              style={{ imageRendering: 'pixelated' }}
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-md" 
            />
          </div>
        </div>
        
        {/* tipos */}
        <div className="mb-8">
          <span className="text-zinc-500 text-x font-bold uppercase tracking-widest">Tipo:</span>
          <div className="flex justify-center gap-3 mt-3">
             {pokemon.types.map((t) => (
               <span key={t.type.name} className="px-5 py-2 rounded-full bg-zinc-900 text-[15px] font-black uppercase tracking-widest text-zinc-300 border border-zinc-800">
                 {t.type.name}
               </span>
             ))}
          </div>
        </div>

        <Link 
          href="/pokemons" 
          className="text-blue-600 hover:text-white transition-colors text-sm font-bold uppercase mt-2 inline-block"
        >
           Voltar para a lista
        </Link>
        
      </div>
    </div>
  );
}