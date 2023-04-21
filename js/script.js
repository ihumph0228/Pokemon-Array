// Define the pokemonRepository object with methods and properties
var pokemonRepository = (function() {
  var pokemonList = []; // Array to store the Pokémon data

  // Function to add Pokémon data to the pokemonList array
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // Function to get all Pokémon data from the pokemonList array
  function getAll() {
    return pokemonList;
  }

  // Fetch Pokémon data from the API and call the add() function to populate the pokemonList array
  function loadList() {
    return fetch('https://pokeapi.co/api/v2/pokemon/?limit=150')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        data.results.forEach(function(item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(error) {
        console.error('Failed to load Pokémon list', error);
      });
  }

  // Return the public methods and properties
  return {
    add: add,
    getAll: getAll,
    loadList: loadList
  };
})();

// Function to render the Pokémon list in the HTML
function renderPokemonList() {
  var pokemonListElement = document.getElementById('pokemon-list');

  // Clear the existing content of the list
  pokemonListElement.innerHTML = '';

  // Loop through the pokemonList array and create list items for each Pokémon
  pokemonRepository.getAll().forEach(function(pokemon) {
    var listItemElement = document.createElement('li');
    var linkElement = document.createElement('a');
    linkElement.href = '#'; // Set a dummy href to prevent navigating to another website
    linkElement.textContent = pokemon.name;

    // Add click event listener on each list item
    listItemElement.addEventListener('click', function() {
      // Fetch the Pokémon details from the API
      fetch(pokemon.detailsUrl)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log(data); // Display the Pokémon object in the console
        })
        .catch(function(error) {
          console.error('Failed to load Pokémon details', error);
        });
    });

    listItemElement.appendChild(linkElement);
    pokemonListElement.appendChild(listItemElement);
  });
}

// Call the loadList() function to fetch Pokémon data from the API and populate the pokemonList array
pokemonRepository.loadList().then(function() {
  // Call the renderPokemonList() function to render the Pokémon list in the HTML
  renderPokemonList();
});