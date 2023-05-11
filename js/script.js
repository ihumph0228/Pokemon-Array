$(document).ready(function() {
  // API URL and default values
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  let limit = 10;
  let offset = 0;

  // Fetch Pokemon data
  function fetchPokemon() {
      $.ajax({
          url: `${apiUrl}?limit=${limit}&offset=${offset}`,
          method: 'GET'
      }).done(function(data) {
          const pokemonList = $('.pokemon-list');
          pokemonList.empty(); // Clear existing list items

          // Loop through the returned data and add each Pokemon to the list
          $.each(data.results, function(index, pokemon) {
              const listItem = $('<li class="list-group-item"></li>');
              const pokemonLink = $('<a></a>');
              pokemonLink.text(pokemon.name);
              pokemonLink.attr('href', '#');
              pokemonLink.click(function() {
                  // Display Pokemon details modal when clicked
                  displayPokemonDetails(`${apiUrl}${pokemon.name}`);
              });
              pokemonLink.appendTo(listItem);
              listItem.appendTo(pokemonList);
          });

          // Add "Load More" button to load additional Pokemon
          const loadMoreBtn = $('<button class="btn btn-primary">Load More</button>');
          loadMoreBtn.click(function() {
              offset += limit;
              fetchPokemon();
          });
          loadMoreBtn.appendTo($('.container'));
      });
  }

  // Fetch individual Pokemon data
  function fetchPokemonData(url) {
      return $.ajax({
          url: url,
          method: 'GET'
      });
  }

  // Display Pokemon details modal
  function displayPokemonDetails(url) {
      fetchPokemonData(url).done(function(pokemon) {
          const pokemonModal = $('#pokemonModal');
          const pokemonModalLabel = $('#pokemonModalLabel');
          const pokemonImage = $('#pokemonImage');
          const pokemonHeight = $('#pokemonHeight');
          const pokemonWeight = $('#pokemonWeight');
          const pokemonTypes = $('#pokemonTypes');

          // Update modal content
          pokemonModalLabel.text(pokemon.name);
          pokemonImage.attr('src', pokemon.sprites.front_default);
          pokemonHeight.text(pokemon.height);
          pokemonWeight.text(pokemon.weight);
          pokemonTypes.empty();
          $.each(pokemon.types, function(index, type) {
              pokemonTypes.append(`<li>${type.type.name}</li>`);
          });

          // Show the modal
          pokemonModal.modal('show');
      });
  }

  // Fetch and display Pokemon on page load
  fetchPokemon();
});
