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

    comparePokemons(comparedPokemon) {
        const results = [];
        if(this.height > comparedPokemon.height) {
            results.push(this.id);
        } else if(this.height < comparedPokemon.height) {
            results.push(comparedPokemon.id);
        } else {
            results.push(null);
        }

        if(this.weight > comparedPokemon.weight) {
            results.push(this.id);
        } else if(this.weight < comparedPokemon.weight) {
            results.push(comparedPokemon.id);
        } else {
            results.push(null);
        }

        this.stats.forEach((stat, index) => {
            const comparedStat = comparedPokemon.stats[index];

            if (stat.base_stat > comparedStat.base_stat) {
                results.push(this.id);
            } else if (stat.base_stat < comparedStat.base_stat) {
                results.push(comparedPokemon.id);
            } else {
                results.push(null)
            }
        });

        return results;
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
    randomPokemon();
})

//Function for creating and appending DOM <Option> elements for all Pokemons.
const createSelections = (e) => {
    let optionA = document.createElement("option");
    optionA.value = e.id-1;
    optionA.textContent = `#${e.id} - ${e.name.toUpperCase()}`;
    
    let optionB = document.createElement("option");
    optionB.value = e.id-1;
    optionB.textContent = `#${e.id} - ${e.name.toUpperCase()}`;
    
    let selectorA = document.getElementById("pokemon_SelectA");
    let selectorB = document.getElementById("pokemon_SelectB");
    
    selectorA.appendChild(optionA);
    selectorB.appendChild(optionB);
}

//Function for creating and appending DOM elements for selected Pokemons.
const createPokemon = (pokemon, selectorID, )=>{
    console.log(selectorID);
    //Variables
    const pokemonDisplayA = document.getElementById("pokemon_DisplayA");
    const pokemonDisplayB = document.getElementById("pokemon_DisplayB");
    const pokemonA = document.getElementById("pokemonA");
    const pokemonB = document.getElementById("pokemonB");

    //Clear Old Pokemon if they exist and update selected Pokemon ID variable
    if(selectorID === pokemonSelectorA){
        if(pokemonA){
            pokemonA.remove();
        }
    }
    if(selectorID === pokemonSelectorB){
        if(pokemonB){
            pokemonB.remove();
        }
    }

    //Create Pokemon DIV
    const pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add("pokemon");

    //Set correct ID
    let selectedID;
    if(selectorID === pokemonSelectorA){
        pokemonDiv.id = "pokemonA";
        console.log("a");
        selectedID = "A";
    } else{
        pokemonDiv.id = "pokemonB";
        console.log("b");
        selectedID = "B";
    }

    //Create Name
    const h2 = document.createElement('h2');
    h2.id = `pokemon${selectedID}_name`;
    h2.className = 'pokemon_name';
    h2.textContent = `#${pokemon.id} - ${pokemon.name.toUpperCase()}`;
    pokemonDiv.appendChild(h2);

    //Create Image
    const img = document.createElement('img');
    img.src = pokemon.img;
    img.alt = '#';
    img.id = `pokemon${selectedID}_img`;
    img.className = 'pokemon_img';
    pokemonDiv.appendChild(img);

    //Create Bio Div
    const pBio = document.createElement("div");
    pBio.classList.add("pokemon_bio");
    pBio.id = `pokemon${selectedID}_bio`;
    pokemonDiv.appendChild(pBio);

    //Create Type
    const pType = document.createElement('p');
    pType.id = `pokemon${selectedID}_type`;
    pType.className = 'pokemon_type';
    const pTypesArr = pokemon.type.map(typeObj => typeObj.type.name);
    const pTypesStr = pTypesArr.join(', ');
    pType.textContent = `Type: ${pTypesStr}`;
    pBio.appendChild(pType);

    //Create Height
    const pHeight = document.createElement('p');
    pHeight.id = `pokemon${selectedID}_height`;
    pHeight.className = 'pokemon_height';
    pHeight.textContent = `Height: ${pokemon.height}"`;
    pBio.appendChild(pHeight);

    //Create Weight
    const pWeight = document.createElement('p');
    pWeight.id = `pokemon${selectedID}_weight`;
    pWeight.className = 'pokemon_weight';
    pWeight.textContent = `Weight: ${pokemon.weight} lb`;
    pBio.appendChild(pWeight);

    //Create Stats Ul
    const pStats = document.createElement("ul");
    pStats.id = `pokemon${selectedID}_stats`;
    pStats.className = 'pokemon_stats';
    
    //Create HP
    const pHP = document.createElement('li');
    pHP.id = `pokemon${selectedID}_hp`;
    pHP.className = 'pokemon_hp';
    pHP.textContent = `Hit Points: ${pokemon.stats[0].base_stat}`;
    pStats.appendChild(pHP);

    //Create Attack
    const pAttack = document.createElement('li');
    pAttack.id = `pokemon${selectedID}_att`;
    pAttack.className = 'pokemon_att';
    pAttack.textContent = `Attack: ${pokemon.stats[1].base_stat}`;
    pStats.appendChild(pAttack);

    //Create Defense
    const pDefense = document.createElement('li');
    pDefense.id = `pokemon${selectedID}_def`;
    pDefense.className = 'pokemon_def';
    pDefense.textContent = `Defense: ${pokemon.stats[2].base_stat}`;
    pStats.appendChild(pDefense);

    //Create Special Attack
    const pAttackS = document.createElement('li');
    pAttackS.id = `pokemon${selectedID}_attS`;
    pAttackS.className = 'pokemon_attS';
    pAttackS.textContent = `Special Attack: ${pokemon.stats[3].base_stat}`;
    pStats.appendChild(pAttackS);

    //Create Special Defense
    const pDefenseS = document.createElement('li');
    pDefenseS.id = `pokemon${selectedID}_defS`;
    pDefenseS.className = 'pokemon_defS';
    pDefenseS.textContent = `Special Defense: ${pokemon.stats[4].base_stat}`;
    pStats.appendChild(pDefenseS);

    //Create Speed
    const pSpeed = document.createElement('li');
    pSpeed.id = `pokemon${selectedID}_speed`;
    pSpeed.className = 'pokemon_speed';
    pSpeed.textContent = `Speed: ${pokemon.stats[5].base_stat}`;
    pStats.appendChild(pSpeed);

    pokemonDiv.appendChild(pStats);

    if(selectorID === pokemonSelectorA){
        pokemonDisplayA.appendChild(pokemonDiv);
    } else {
        pokemonDisplayB.appendChild(pokemonDiv);
    }
}

//Function for selecting Random Pokemons
const randomPokemon = ()=>{
    pokemonSelectorA.selectedIndex = Math.floor(Math.random() * 151) + 1;
    pokemonSelectorA.dispatchEvent(new Event('change'));
    pokemonSelectorB.selectedIndex = Math.floor(Math.random() * 151) + 1;
    pokemonSelectorB.dispatchEvent(new Event('change'));
}

//Pokemon Selector DOM Variables
const pokemonSelectorA = document.getElementById("pokemon_SelectA");
const pokemonSelectorB = document.getElementById("pokemon_SelectB");

//Array storing currently active Pokemons
let activePokemons = [];

//EventListners for triggering pokemon creation
pokemonSelectorA.addEventListener("change", ()=>{
    const selectedPokemon = pokemonSelectorA.value;
    const selectorID = pokemonSelectorA;
    createPokemon(pokemonArr[selectedPokemon], selectorID);
    activePokemons[0] = pokemonArr[selectedPokemon];
})
pokemonSelectorB.addEventListener("change", ()=>{
    const selectedPokemon = pokemonSelectorB.value;
    const selectorID = pokemonSelectorB;
    createPokemon(pokemonArr[selectedPokemon], selectorID);
    activePokemons[1] = pokemonArr[selectedPokemon];
})

const highlightWinner = ()=>{
    const winnerIds = activePokemons[0].comparePokemons(activePokemons[1]);
    
}



  
  

