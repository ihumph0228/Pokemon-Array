// Define the pokemonRepository object with methods and properties
var pokemonRepository = (function() {
  var pokemonList = []; // Array to store the Pokémon data
  var modalElement = document.querySelector('#pokemon-modal');
  var modalTitleElement = modalElement.querySelector('.modal-title');
  var modalBodyElement = modalElement.querySelector('.modal-body');
  var modalImageElement = modalElement.querySelector('.modal-image');
  var modalCloseElement = modalElement.querySelector('.modal-close');

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

  // Function to show the Pokémon details in a modal
  function showDetails(pokemon) {
    // Fetch additional details of the Pokémon from the detailsUrl
    fetch(pokemon.detailsUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // Update the modal content with the Pokémon details
        modalTitleElement.textContent = pokemon.name;
        modalBodyElement.innerHTML = `
          <p><strong>Height:</strong> ${data.height} m</p>
          <p><strong>Weight:</strong> ${data.weight} kg</p>
          <p><strong>Abilities:</strong> ${data.abilities.map(function(ability) { return ability.ability.name }).join(', ')}</p>
        `;
        modalImageElement.src = data.sprites.front_default;
        modalElement.classList.add('modal-active');
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

// Call
