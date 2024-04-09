//Fetch API Data.
const promises = [];
for(let i = 1; i <= 151; i++ ){
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
}

//Create Pokemon Class.
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

//Create Array of Pokemons from data, then create pokemon DOM Selections.
const pokemonArr = []
Promise.all(promises).then((results) => {
    results.forEach((e)=>{
        const pokemon = new Pokemon(e.name, e.id, e.sprites.front_default, e.types, e.weight, e.height, e.stats);
        pokemonArr.push(pokemon);
        createSelections(pokemon);
    })
})

//Function for creating and appending DOM <Option> elements for all Pokemons.
const createSelections = (e) => {
    let optionA = document.createElement("option");
    optionA.value = e.id;
    optionA.textContent = `#${e.id} - ${e.name.toUpperCase()}`;
    
    let optionB = document.createElement("option");
    optionB.value = e.id;
    optionB.textContent = `#${e.id} - ${e.name.toUpperCase()}`;
    
    let selectorA = document.getElementById("pokemon_SelectA");
    let selectorB = document.getElementById("pokemon_SelectB");
    
    selectorA.appendChild(optionA);
    selectorB.appendChild(optionB);
}

//Function for creating and appending DOM elements for selected Pokemons.
const createPokemon = (pokemon, selectorID)=>{
    //Create Pokemon DIV
    const pokemonDiv = document.createElement('div');
    pokemonDiv.id = 'pokemonA';

    //Create Name
    const h2 = document.createElement('h2');
    h2.id = 'pokemonA_name';
    h2.className = 'pokemon_name';
    h2.textContent = `#${pokemon.id} - ${pokemon.name.toUpperCase()}`;
    pokemonDiv.appendChild(h2);

    //Create Image
    const img = document.createElement('img');
    img.src = pokemon.img;
    img.alt = '#';
    img.id = 'pokemonA_img';
    img.className = 'pokemon_img';
    pokemonDiv.appendChild(img);

    //Create Type
    const pType = document.createElement('p');
    pType.id = 'pokemonA_type';
    pType.className = 'pokemon_type';
    const pTypesArr = pokemon.type.map(typeObj => typeObj.type.name);
    const pTypesStr = pTypesArr.join(', ');
    pType.textContent = `Types: ${pTypesStr}`;
    pokemonDiv.appendChild(pType);

    //Create Height
    const pHeight = document.createElement('p');
    pHeight.id = 'pokemonA_height';
    pHeight.className = 'pokemon_height';
    pHeight.textContent = `Height: ${pokemon.height}"`;
    pokemonDiv.appendChild(pHeight);

    //Create Weight
    const pWeight = document.createElement('p');
    pWeight.id = 'pokemonA_weight';
    pWeight.className = 'pokemon_weight';
    pWeight.textContent = `Weight: ${pokemon.weight} lb`;
    pokemonDiv.appendChild(pWeight);

    //Create Stats DIV
    const pStats = document.createElement("ul");
    pStats.id = 'pokemonA_stats';
    pStats.className = 'pokemon_stats';
    
    //Create HP
    const pHP = document.createElement('li');
    pHP.id = 'pokemonA_hp';
    pHP.className = 'pokemon_hp';
    pHP.textContent = `Hit Points: ${pokemon.stats[0].base_stat}`;
    pStats.appendChild(pHP);

    //Create Attack
    const pAttack = document.createElement('li');
    pAttack.id = 'pokemonA_Att';
    pAttack.className = 'pokemon_hp';
    pAttack.textContent = `Attack: ${pokemon.stats[1].base_stat}`;
    pStats.appendChild(pAttack);

    //Create Defense
    const pDefense = document.createElement('li');
    pDefense.id = 'pokemonA_Def';
    pDefense.className = 'pokemon_hp';
    pDefense.textContent = `Defense: ${pokemon.stats[2].base_stat}`;
    pStats.appendChild(pDefense);

    //Create Special Attack
    const pAttackS = document.createElement('li');
    pAttackS.id = 'pokemonA_AttS';
    pAttackS.className = 'pokemon_hp';
    pAttackS.textContent = `Special Attack: ${pokemon.stats[3].base_stat}`;
    pStats.appendChild(pAttackS);

    //Create Special Defense
    const pDefenseS = document.createElement('li');
    pDefenseS.id = 'pokemonA_DefS';
    pDefenseS.className = 'pokemon_hp';
    pDefenseS.textContent = `Special Defense: ${pokemon.stats[4].base_stat}`;
    pStats.appendChild(pDefenseS);

    //Create Speed
    const pSpeed = document.createElement('li');
    pSpeed.id = 'pokemonA_Speed';
    pSpeed.className = 'pokemon_hp';
    pSpeed.textContent = `Speed: ${pokemon.stats[5].base_stat}`;
    pStats.appendChild(pSpeed);

    pokemonDiv.appendChild(pStats);

    const pokemonDisplay = document.getElementById("pokemonDisplay");
    pokemonDisplay.appendChild(pokemonDiv);
}

const pokemonSelectorA = document.getElementById("pokemon_SelectA");
const pokemonSelectorB = document.getElementById("pokemon_SelectA");

pokemonSelectorA.addEventListener("change", ()=>{
    const selectorID = pokemonSelectorA.value;
    createPokemon(pokemonArr[selectorID], selectorID);
})

pokemonSelectorB.addEventListener("change", ()=>{
    const selectorID = pokemonSelectorB.value;
    createPokemon(pokemonArr[selectorID], selectorID);
})


  
  

