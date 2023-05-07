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

  modalCloseElement.addEventListener('click', function() {
    modalElement.classList.remove('show');
  });

  window.addEventListener('click', function(event) {
    if (event.target == modalElement) {
      modalElement.classList.remove('show');
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

function renderPokemonList() {
  var pokemonListElement = document.querySelector('.list-group');

  pokemonListElement.innerHTML = '';

  pokemonRepository.getAll().forEach(function(pokemon) {
    var listItemElement = document.createElement('li');
    var buttonElement = document.createElement('button');
    buttonElement.textContent = pokemon.name;
    buttonElement.classList.add('list-group-item', 'list-group-item-action');
    listItemElement.appendChild(buttonElement);
    pokemonListElement.appendChild(listItemElement);
    buttonElement.addEventListener('click', function() {
      pokemonRepository.showDetails(pokemon);
    });
  });
}

pokemonRepository.loadList().then(function() {
  renderPokemonList();
});
