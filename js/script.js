//Array of Pokemon. Height is listed as inches create IIFE to avoid global state
let pokemonRepository = (function() {
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

  // Return object with public functions
  return {
    getAll: function() {
      return pokemonList;
    },
    add: function(item) {
      pokemonList.push(item);
    }
  };
})();

// Loop through the pokemonList array using forEach
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
