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
          // Call the showDetails() function to display the Pokémon details in a modal
          showDetails(data);
        })
        .catch(function(error) {
          console.error('Failed to load Pokémon details', error);
        });
    });

    listItemElement.appendChild(linkElement);
    pokemonListElement.appendChild(listItemElement);
  });
}

// Function to show the Pokémon details in a modal
function showDetails(pokemon) {
  var modalElement = document.getElementById('pokemon-modal');
  var modalTitleElement = modalElement.querySelector('.modal-title');
  var modalBodyElement = modalElement.querySelector('.modal-body');
  var modalImageElement = modalElement.querySelector('.modal-image');

  // Set the modal title and body content
  modalTitleElement.textContent = 'Name: ' + pokemon.name;
  modalBodyElement.innerHTML = 'Height: ' + pokemon.height + '<br>' + 'Weight: ' + pokemon.weight;

  // Set the modal image source and alt text
  modalImageElement.src = pokemon.sprites.front_default;
  modalImageElement.alt = pokemon.name + ' Image';

  // Show the modal
  modalElement.style.display = 'block';

  // Add click event listener on modal close button
  var modalCloseElement = modalElement.querySelector('.modal-close');
  modalCloseElement.addEventListener('click', function() {
    // Hide the modal
    modalElement.style.display = 'none';
  });

// Add event listener to close the modal when clicking outside of it
window.addEventListener('click', function(event) {
  if (event.target == modalElement) {
    // Hide the modal
    modalElement.style.display = 'none';
  }
});