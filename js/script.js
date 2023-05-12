// Define the pokemonRepository object with methods and properties
var pokemonRepository = (function () {
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
    return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    data.results.forEach(function (item) {
    var pokemon = {
    name: item.name,
    detailsUrl: item.url,
    };
    add(pokemon);
    });
    })
    .catch(function (error) {
    console.error("Failed to load Pokémon list", error);
    });
    }
    
    function addListItem(pokemon) {
    let listGroup = document.querySelector("#pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon");
    button.classList.add("btn");
    button.classList.add("btn-primary");
    listItem.classList.add("list-group-item");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");
    button.addEventListener("click", function () {
    showDetails(pokemon);
    });
    listItem.appendChild(button);
    listGroup.appendChild(listItem);
    }
    
    function showDetails(pokemon) {
    loadDetails(pokemon).then(function (item) {
    const modalTitleElement = document.querySelector(".modal-title");
    const modalImageElement = document.querySelector("#pokemonImage");
    const modalHeightElement = document.querySelector("#pokemonHeight");
    $(modalImageElement).attr("src", item.imageURL);
    $(modalTitleElement).text(pokemon.name);
    $(modalHeightElement).text(item.height);
    });
    }
    
    // Function to show the Pokémon details in a modal
    function loadDetails(item) {
    return fetch(item.detailsUrl)
    .then(function (response) {
    return response.json();
    })
    .then(function (details) {
    item.imageURL = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
    return item;
    })
    .catch(function (e) {
    console.error(e);
    });
    }
    
    // Close modal when clicking on close button
    // modalCloseElement.addEventListener('click', function() {
    // modalElement.classList.remove('modal-active');
    // });
    
    // Close modal when clicking outside of it
    // window.addEventListener('click', function(event) {
    // if (event.target == modalElement) {
    // modalElement.classList.remove('modal-active');
    // }
    // });
    
    // Return the public methods and properties
    return {
    add: add,
    addListItem,
    getAll: getAll,
    loadList: loadList,
    showDetails: showDetails,
    };
    })();
    
    // Function to render the Pokémon list in the HTML
    function renderPokemonList() {
    // Loop through the pokemonList array and create list items for each Pokémon
    pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
    });
    });
    }
    
    renderPokemonList(); // Call the loadList() and renderPokemonList() functions to fetch and display the Pokémon list
    // pokemonRepository.loadList().then(function()