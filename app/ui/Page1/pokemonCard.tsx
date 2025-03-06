"use client"
import { PokemonDetails } from "@/app/lib/pokemon";

export default function PokemonCard({ name, sprite }: PokemonDetails) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center gap-2 w-[15vh]">
            <img src={sprite || ""} alt={name} />
            <h2 className="text-[1rem] font-bold">{name}</h2>
        </div> 
    );
}