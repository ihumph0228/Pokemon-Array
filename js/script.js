// Polyfills for promises and fetch
if (!window.Promise) {
  window.Promise = Promise;
}

if (!window.fetch) {
  window.fetch = function(url) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = function() {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(Error(xhr.statusText));
        }
      };
      xhr.onerror = function() {
        reject(Error('Network Error'));
      };
      xhr.send();
    });
  };
}

let pokemonRepository = (function() {
  // The array of Pokemon objects
  let pokemonList = [];

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
    let pokemonList = document.querySelector('#pokemon-list');

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
    // Call the loadDetails() function with the Pokemon object as parameter
    loadDetails(pokemon)
      .then(function(details) {
        // Log the Pokemon details in the console
        console.log(details);
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  // Load data from external source
  function LoadList() {
    return fetch('https://pokeapi.co/api/v2/pokemon/')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        data.results.forEach(function(pokemon) {
          // Call the add() function to add each Pokemon from the results to the pokemonList variable
          add({
            name: pokemon.name,
            detailsUrl: pokemon.url
          });
        });
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  // Load Pokemon details from external source
  function loadDetails(pokemon) {
    return fetch(pokemon.detailsUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // Assign some of the details from the response to the Pokemon in the pokemonList
        pokemon.imgUrl = data.sprites.front_default;
        pokemon.height = data.height;
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  // Return an object containing the public functions
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    LoadList: LoadList,
    loadDetails: loadDetails
 