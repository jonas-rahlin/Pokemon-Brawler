/* https://pokeapi.co/api/v2/pokemon?limit=151 */
const promises = [];
for(let i = 1; i <= 151; i++ ){
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
}

console.log(promises);

Promise.all(promises).then((results) => {
    console.log(results);
    results.forEach((e)=>{
        const pokemon = new Pokemon(e.name, e.sprites.front_default, e.types, e.weight, e.height, e.stats);
        console.log(pokemon);
        
        createSelections(pokemon);
    })
})

class Pokemon {
    constructor(name, id, img, type, weight, height, stats) {
        this.name = name;
        this.id = id;
        this.img = img;
        this.type = type;
        this.weight = weight;
        this.height = height;
        this.stats = stats;
    }
}

//Create and Append DOM <Option> Elements for all Pokemons
const createSelections = (e) => {
    let optionA = document.createElement("option");
    optionA.value = e.id;
    optionA.textContent = e.name;
    
    let optionB = document.createElement("option");
    optionB.value = e.id;
    optionB.textContent = e.name;
    
    let selectorA = document.getElementById("pokemon_SelectA");
    let selectorB = document.getElementById("pokemon_SelectB");
    
    selectorA.appendChild(optionA);
    selectorB.appendChild(optionB);
}





const createPokemon = (selectorID)=>{
    const pokemon = document.createElement('div');
    pokemon.id = 'pokemonA';

    const h2 = document.createElement('h2');
    h2.id = 'pokemonA_name';
    h2.className = 'pokemon_name';
    pokemon.appendChild(h2);

    const img = document.createElement('img');
    img.src = '';
    img.alt = '';
    img.id = 'pokemonA_img';
    img.className = 'pokemon_img';
    pokemon.appendChild(img);

    const pType = document.createElement('p');
    pType.id = 'pokemonA_type';
    pType.className = 'pokemon_type';
    pokemon.appendChild(pType);

    const pHeight = document.createElement('p');
    pHeight.id = 'pokemonA_height';
    pHeight.className = 'pokemon_height';
    pokemon.appendChild(pHeight);

    const pWeight = document.createElement('p');
    pWeight.id = 'pokemonA_weight';
    pWeight.className = 'pokemon_weight';
    pokemon.appendChild(pWeight);

    const pHP = document.createElement('p');
    pHP.id = 'pokemonA_hp';
    pHP.className = 'pokemon_hp';
    pokemon.appendChild(pHP);

    const pokemonDisplay = document.getElementById("pokemonDisplay");
    pokemonDisplay.appendChild(pokemon);
}