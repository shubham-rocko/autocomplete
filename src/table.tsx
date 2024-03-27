import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";


const fetchPokemonAbility = async (url: string) => {
  const pokemonRes = await fetch(url);
  const pokemonData = await pokemonRes.json();

  if (pokemonData?.abilities && Array.isArray(pokemonData.abilities)) {
      return pokemonData.abilities.map((abilityData: any) => {
        return abilityData.ability.name;
    });
  }
  return [];
}


const PokemonAbilities = ({url, index}: any) => {
  const { data, isLoading, error } = useQuery(`exampleQueryKey_${index}`, () => fetchPokemonAbility(url));
  if (isLoading) {
    return <span>Data is still Loading... {index}</span>
  }
  return (
    <>
      {data.join(',')}
    </>
  )
}

const Table = () => {
  const url = "https://pokeapi.co/api/v2/pokemon";
  const [pokemonList, setPokemonList] = useState([]);
  // const didMountRef = useRef(false);


  // useEffect(() => {
  //   if ((didMountRef.current && pokemonList.length) || !pokemonList.length) {
  //     return;
  //   }

  //   if (!didMountRef.current && pokemonList.length) {
  //     didMountRef.current = true;
  //   }
  //   pokemonList.map(async(pokemonDetails: any, index: number) => {
  //     pokemonDetails.ability = await getPokemonData(pokemonDetails.url, index); // this blocking till all 
  //     return pokemonDetails;
  //   });
  // }, [pokemonList]);


  const getPokemonList = async () => {
    try {
      const pokemonRes = await fetch(url);
      const pokemonData = await pokemonRes.json();
      if (pokemonData?.results && Array.isArray(pokemonData?.results)) {
        // get ability and merge in the pokemonList data
        setPokemonList(pokemonData?.results);
      } else {
        throw new Error("Poekmon Data is not found");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPokemonList();
  }, []);

  return (
    <div>
      <table>
        <tr>
          <th>Pokemon name</th>
          <th>Pokemon Ability</th>
        </tr>
        {pokemonList.map((pokemonDetails: any, index: number) => {
          return (
            <tr key={pokemonDetails.url}>
              <td>{pokemonDetails.name}</td>
              <td>
                <PokemonAbilities url={pokemonDetails.url} index={index}/>
              </td>
            </tr>
          )
        })}
      </table>
    </div>
  );
};

export default Table;
