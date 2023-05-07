// Define the pokemonRepository object with methods and properties
var pokemonRepository = (function() {
  var pokemonList = [];
  var modalElement = document.getElementById('pokemon-modal');
  var modalTitleElement = document.querySelector('.modal-title');
  var modalBodyElement = document.querySelector('.modal-body');
  var modalImageElement = document.querySelector('.modal-image');
  var modalCloseElement = document.querySelector('.modal-close');

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

  function showDetails(pokemon) {
    fetch(pokemon.detailsUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        modalTitleElement.textContent = pokemon.name;
        modalBodyElement.innerHTML = `
          <p>Height: ${data.height} m</p>
          <p>Weight: ${data.weight} kg</p>
          <p>Type: ${data.types.map(t => t.type.name).join(', ')}</p>
        `;
        modalImageElement.src = data.sprites.front_default;
        modalElement.classList.add('show');
      })
      .catch(function(error) {
        console.error('Failed to load Pokémon details', error);
      });
  }

  // Close modal when clicking on close button
  modalCloseElement.addEventListener('click', function() {
    modalElement.classList.remove('modal-active');
  });

  // Close modal when clicking outside of it
  window.addEventListener('click', function(event) {
    if (event.target == modalElement) {
      modalElement.classList.remove('modal-active');
    }
  });

  // Return the public methods and properties
  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    showDetails: showDetails
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
    var buttonElement = document.createElement('button');
    buttonElement.textContent = pokemon.name;
    buttonElement.classList.add('pokemon-list-item');
    listItemElement.appendChild(buttonElement);
    pokemonListElement.appendChild(listItemElement);
    buttonElement.addEventListener('click', function() {
      pokemonRepository.showDetails(pokemon);
    });
  });
}

// Call the loadList() and renderPokemonList() functions to fetch and display the Pokémon list
pokemonRepository.loadList().then(function() {
  renderPokemonList();
});
