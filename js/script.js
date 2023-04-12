let pokemonRepository = (function() {
  // The array of Pokemon objects
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

  // Returns the entire pokemonList array
  function getAll() {
    return pokemonList;
  }

  // Adds a new Pokemon object to the end of the pokemonList array
  function add(item) {
    pokemonList.push(item);
  }

  // Creates an li element with a button inside and appends it to the .pokemon-list ul in index.html
  function addListItem(pokemon) {
    // Select the unordered list in index.html
    let pokemonList = document.querySelector('.pokemon-list');

    // Create a new list item element
    let listItem = document.createElement('li');

    // Append the list item to the unordered list
    pokemonList.appendChild(listItem);

    // Create a new button element
    let button = document.createElement('button');

    // Set the button's text to the Pokemon's name
    button.innerText = pokemon.name;

    // Add a custom class to the button for styling
    button.classList.add('button-class');

    // Append the button to the list item
    listItem.appendChild(button);
    
    //Add event listener to the button
    button.addEventListener('click', function() {
      showDetails(pokemon);
      });
      }
    
    // Creates a new function to log the Pokemon details
    function showDetails(pokemon) {
      console.log(pokemon);
    }

    // Loop through the pokemonList array using forEach and call the addListItem function for each Pokemon
  function addAllPokemon() {
    pokemonList.forEach(function(pokemon) {
      addListItem(pokemon);
    });
  }

  // Return an object containing the public functions
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  };
})();

// Call the addAllPokemon function to add all the Pokemon to the html
pokemonRepository.addAllPokemon();
