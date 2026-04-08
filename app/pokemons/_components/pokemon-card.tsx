import Link from "next/link";

interface PokemonCardProps {
  id: number;
  name: string;
}

export default function PokemonCard({ id, name }: PokemonCardProps) {
  // caminho das imagens
  const imagemUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
  // const imagemUrl =`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
  // const imagemUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Link href={`/pokemons/${id}`}>
      <div className="group flex flex-col items-center p-6 rounded-3xl border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 hover:border-zinc-400 transition-all duration-300 cursor-pointer shadow-lg">
        <div className="relative w-32 h-32 mb-4">
          <img 
            src={imagemUrl} 
            alt={name} 
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" 
          />
        </div>
        
        <p className="text-xs text-zinc-500 font-mono font-bold tracking-widest">#{String(id).padStart(3, '0')}</p>
        <p className="text-2xl font-black capitalize mb-2 text-white tracking-tight">{name}</p>
        
        <span className="text-blue-500 text-xs font-bold uppercase tracking-tighter group-hover:text-blue-400">
          Ver detalhes 
        </span>
      </div>
    </Link>
  );
}