//Array of Pokemon. Height is listed as inches
let pokemonList = [
    {
      name: 'Blastoise', 
      height: "63\"", 
      type: ['Water']
    },
    { 
      name: 'Butterfree', 
      height: "43\"", 
      type: ['Bug, Flying']
    },
    { 
      name: 'Pikachu', 
      height: "16\"", 
      type: ['Electric'] 
    }
];

// Loop through the pokemonList array to creat an <li> element for each Pokemon
for (let i = 0; i < pokemonList.length; i++) {
    let pokemonText = '<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')';
    
    // Add a message if the Pokemon's height is greater than 50 inches
    if (parseFloat(pokemonList[i].height) > 50) {
        pokemonText += ' wow, that is big!';
    }

    pokemonText += '</p>';
    document.write(pokemonText);
}
