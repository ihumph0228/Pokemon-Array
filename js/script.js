//Array of Pokemon. Height is listed as inches
let pokemonList = [
    { name: 'Blastoise', height: "63\"", type: ['Water'] },
    { name: 'Butterfree', height: "43\"", type: ['Bug, Flying'] },
    { name: 'Pikachu', height: "16\"", type: ['Electric'] }
];

// Get the <ul> elemnt by its ID
let ul = document.getElementById('pokemonList');

// Loop through the pokemonList array to creat an <li> element for each Pokemon
pokemonList.forEach(pokemon => {
    let li = document.createElement('li');
    li.textContent = '${pokemon.name} (height: ${pokemon.height}, type: ${pokemon.type.join(', ')})';
    ul.appendChild(li);
});