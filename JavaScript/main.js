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
    })
})

class Pokemon {
    constructor(name, img, type, weight, height, stats) {
        this.name = name;
        this.img = img;
        this.type = type;
        this.weight = weight;
        this.height = height;
        this.stats = stats;
    }
}