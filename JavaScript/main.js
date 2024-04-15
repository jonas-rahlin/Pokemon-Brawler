//Arrays for storing pokemons.
const pokemonArr = [];
let activePokemons = [];

//Array for tracking winner stats.
let winnerArr = [];

//Array for storing Fight Information
let fightInfo = [];

//Variables for Fight Event DOM display
const battleEvent = document.getElementById("battle_event");
const battleEventA = document.getElementById("battle_eventA");
const battleEventB = document.getElementById("battle_eventB");

//Function for displaying Fight Events in the DOM.
const fightAnnouncement = async (i) =>{
    let attacker = i.attacker;
    let defender = i.defender;
    let damage = i.damage;
    let hpLeft = i.hpLeft;

    //Round Sequence
    const sequencePromise = () =>{
        return new Promise ((resolve) => {
            setTimeout(()=>{
                //Show Event A
                battleEvent.classList.remove("display_none");
                battleEventA.textContent = "BAM!";
                battleEventA.classList.remove("visibility_hidden");
        
                //Show Event B1
                setTimeout(()=>{
                    battleEventB.textContent = `${attacker} hit ${defender} for ${damage} dmg.`;
                    battleEventB.classList.remove("visibility_hidden");
        
                    //Hide Event B1
                    setTimeout(()=>{
                        battleEventB.classList.add("visibility_hidden");
        
                        //Show Event B2
                        setTimeout(()=>{
                            battleEventB.textContent = `${defender} has ${hpLeft} HP left.`;
                            battleEventB.classList.remove("visibility_hidden");
                        },1000)
        
                        //End Round
                        setTimeout(()=>{
                            battleEvent.classList.add("display_none");
                            battleEventA.classList.add("visibility_hidden");
                            battleEventB.classList.add("visibility_hidden");
                            battleEventA.textContent = "";
                            battleEventB.textContent = "";

                            //Resolve Promise
                            resolve();
                        },3000)
                        
                    }, 2000)
               },1000)
            },500)
        })
    }
    await sequencePromise();
}

//Function for running fightAnnouncement() on each fightInfo element
const initiateFightAnnouncement = async () => {
    for (const round of fightInfo) {
        await fightAnnouncement(round);
    }
};







//Initiate Pokemon Creation
fetchPokemonData();

//Pokemon Selector DOM Variables.
const pokemonSelectorA = document.getElementById("pokemon_SelectA");
const pokemonSelectorB = document.getElementById("pokemon_SelectB");
//EventListners for triggering pokemon DOM creation.
pokemonSelectorA.addEventListener("change", ()=>{
    const selectedPokemon = pokemonSelectorA.value;
    const selectorID = pokemonSelectorA;
    createPokemon(pokemonArr[selectedPokemon], selectorID);
    highlightStats();
})
pokemonSelectorB.addEventListener("change", ()=>{
    const selectedPokemon = pokemonSelectorB.value;
    const selectorID = pokemonSelectorB;
    createPokemon(pokemonArr[selectedPokemon], selectorID);
    highlightStats();
})

//Battle Btn DOM Variable
const battleBtn = document.getElementById("battle_Btn");
//Eventlistener to start combat sequence
battleBtn.addEventListener("click", ()=>{
    activePokemons[0].fightSequence(activePokemons[1]);
})

/* Classes and Functions. */
//Pokemon Class.
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
            results.push(0);
        }

        if(this.weight > comparedPokemon.weight) {
            results.push(this.id);
        } else if(this.weight < comparedPokemon.weight) {
            results.push(comparedPokemon.id);
        } else {
            results.push(0);
        }

        this.stats.forEach((stat, index) => {
            const comparedStat = comparedPokemon.stats[index];

            if (stat.base_stat > comparedStat.base_stat) {
                results.push(this.id);
            } else if (stat.base_stat < comparedStat.base_stat) {
                results.push(comparedPokemon.id);
            } else {
                results.push(0)
            }
        });

        return results;
    }

    fightSequence(opponent) {
        let first;
        let second;

        if(this.stats[5].base_stat >= opponent.stats[5].base_stat){
            first = {...this};
            second = {...opponent};
        }   else{
            first = {...opponent};
            second = {...this};
        }

        let firstHP = first.stats[0].base_stat;
        let secondHP = second.stats[0].base_stat;
        let totalDmg;
        console.log(firstHP, secondHP);

        const firstAttack = () =>{
            let totalAtt = first.stats[1].base_stat + first.stats[3].base_stat;
            let totalDef = (second.stats[2].base_stat + second.stats[4].base_stat) * 0.8;
            totalDmg = totalAtt - totalDef;

            if(totalDmg < 10){
                totalDmg = 10;
            }   

            console.log(totalAtt, totalDef, totalDmg);

            secondHP = secondHP - totalDmg;

            console.log("secondHP = " + secondHP);

            const attackInfo = {
                attacker:first.name, 
                damage:Math.round(totalDmg),
                defender: second.name, 
                hpLeft: secondHP
            }
            fightInfo.push(attackInfo);
        }

        const secondAttack = () =>{
            let totalAtt = second.stats[1].base_stat + second.stats[3].base_stat;
            let totalDef = (first.stats[2].base_stat + first.stats[4].base_stat) * 0.8;
            totalDmg = totalAtt - totalDef;

            if(totalDmg < 10){
                totalDmg = 10;
            }

            console.log(totalAtt, totalDef, totalDmg);

            firstHP = firstHP - totalDmg;

            console.log("firstHP = " + firstHP);

            const attackInfo = {
                attacker:second.name, 
                damage:totalDmg,
                defender: first.name, 
                hpLeft: firstHP
            }
            fightInfo.push(attackInfo);
        }
        
        const battleEvents = document.getElementById("battle_event");
        const battleEventsA = document.getElementById("battle_eventA");
        const battleEventsB = document.getElementById("battle_eventB");

/*         const announce = (attacker, defender, defenderHP, totalDmg)=>{
            if(defenderHP < 0){
                defenderHP = 0;
            }

            battleEvents.classList.remove("display_none");
            battleEventsA.textContent = "Bam!";
            battleEventsA.classList.remove("visibility_hidden");
            setTimeout(()=>{
                battleEventsB.textContent = `${attacker.name} attacked for ${totalDmg} damage.`;
                battleEventsB.classList.remove("visibility_hidden");
                setTimeout(()=>{
                    battleEventsB.textContent = `${defender.name} has ${defenderHP} HP left.`;
                    setTimeout(()=>{
                        battleEvents.classList.add("display_none");
                        battleEventsA.classList.add("visibility_hidden");
                        battleEventsB.classList.add("visibility_hidden");
                    },1000)
                },1200)
            },1000)
        } */

        while(firstHP > 0 && secondHP > 0){
            firstAttack();

            if(secondHP > 0){
                secondAttack();
            }
        }
    }
}

//Fetch API Data and create array of pokemons.
async function fetchPokemonData() {
    try {
        //Fetch API Data.
        const promises = [];
        for (let i = 1; i <= 151; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            promises.push(fetch(url).then((res) => {
                if (!res.ok) {
                    throw new Error(`Error! Status: ${res.status}`);
                }
                return res.json();
            }));
        }

        //Create Pokemons from API Data.
        const results = await Promise.all(promises);
        results.forEach((e) => {
            const pokemon = new Pokemon(
                e.name,
                e.id,
                e.sprites.front_default,
                e.types,
                e.weight,
                e.height,
                e.stats
            );
            pokemonArr.push(pokemon);

            //Generate DOM Selection elements for each Pokemon
            createSelections(pokemon);
        });

        //Select random Pokemons and apply stats highlighting
        randomPokemon();
        highlightStats();

    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
    }
}

//Create and append DOM <Option> elements for all Pokemons.
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

//Creating and appending DOM elements for selected Pokemons.
const createPokemon = (pokemon, selectorID, )=>{
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
    pokemonDiv.setAttribute("data-id", pokemon.id);

    //Set correct ID
    let selectedID;
    if(selectorID === pokemonSelectorA){
        pokemonDiv.id = "pokemonA";
        selectedID = "A";
    } else{
        pokemonDiv.id = "pokemonB";
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

//Select Random Pokemons.
const randomPokemon = ()=>{
    pokemonSelectorA.selectedIndex = Math.floor(Math.random() * 151) + 1;
    pokemonSelectorA.dispatchEvent(new Event('change'));
    pokemonSelectorB.selectedIndex = Math.floor(Math.random() * 151) + 1;
    pokemonSelectorB.dispatchEvent(new Event('change'));
}

//Highlight Winning Stats.
const highlightStats = ()=>{
    const pokemon = [...document.querySelectorAll(".pokemon")];

    //Remove Highlights
    document.querySelectorAll(".winner_stat").forEach(element => {
        element.classList.remove("winner_stat");
    });
    document.querySelectorAll(".winner_attr").forEach(element => {
        element.classList.remove("winner_attr");
    });

    pokemon.forEach((element)=>{
        //Set Active Pokemons and Winner values
        activePokemons[0] = pokemonArr[pokemonSelectorA.value];
        activePokemons[1] = pokemonArr[pokemonSelectorB.value];
        winnerArr = activePokemons[0].comparePokemons(activePokemons[1]);

        //DOM Element Variables
        let domHeight = element.querySelector('.pokemon_height');
        let domWeight = element.querySelector('.pokemon_weight');
        let domHp = element.querySelector('.pokemon_hp');
        let domAtt = element.querySelector('.pokemon_att');
        let domDef = element.querySelector('.pokemon_def');
        let domAttS = element.querySelector('.pokemon_attS');
        let domDefS = element.querySelector('.pokemon_defS');
        let domSpeed = element.querySelector('.pokemon_speed');

        //Highlight Attributes
        if(element.dataset.id === winnerArr[0].toString()){
            domHeight.classList.add("winner_attr");
        }
        if(element.dataset.id === winnerArr[1].toString()){
            domWeight.classList.add("winner_attr");
        }

        //Highlight Stats
        if(element.dataset.id === winnerArr[2].toString()){
            domHp.classList.add("winner_stat");
        }
        if(element.dataset.id === winnerArr[3].toString()){
            domAtt.classList.add("winner_stat");
        }
        if(element.dataset.id === winnerArr[4].toString()){
            domDef.classList.add("winner_stat");
        }
        if(element.dataset.id === winnerArr[5].toString()){
            domAttS.classList.add("winner_stat");
        }
        if(element.dataset.id === winnerArr[6].toString()){
            domDefS.classList.add("winner_stat");
        }
        if(element.dataset.id === winnerArr[7].toString()){
            domSpeed.classList.add("winner_stat");
        }
    })
}

const fightSequence = () => {
    //reseta fight info
}

  




//Fetch API Data.
/* const promises = [];
for(let i = 1; i <= 151; i++ ){
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
} */
//Fill Array of Pokemons from data.
//Create pokemon DOM Selections.
//Compare active pokemons in winnerArr.
/* Promise.all(promises).then((results) => {
    results.forEach((e)=>{
        const pokemon = new Pokemon(e.name, e.id, e.sprites.front_default, e.types, e.weight, e.height, e.stats);
        pokemonArr.push(pokemon);
        createSelections(pokemon);
    });

    randomPokemon();

    highlightStats();
}) */


/* setTimeout(()=>{
    if(fighter === first){
        eventB.textContent = `${first.name} attacked ${second.name} for ${dmg} HP.`;
        eventB.classList.toggle("display_none");
        setTimeout(()=>{
            eventB.classList.toggle("display_none"); 
            eventB.textContent = "";
        },2000) 
        console.log("1");
    }

    else if (fighter === second) {
        eventB.textContent = `${second.name} attacked ${first.name} for ${dmg} HP.`;
        eventB.classList.toggle("display_none");
        setTimeout(()=>{
            eventB.classList.toggle("display_none"); 
            eventB.textContent = "";
        },2000)
        console.log("2");
    }
},1000); */