$(document).ready(function() {
  var pokemonList = $(".pokemon-list");

  // Fetch the list of Pokemons from the API
  $.get("https://pokeapi.co/api/v2/pokemon/?limit=150").done(function(data) {
    var pokemons = data.results;

    // Loop through each Pokemon and create a list item for it
    $.each(pokemons, function(index, pokemon) {
      var listItem = $("<li>").addClass("list-group-item");
      var link = $("<a>").attr("href", "#").text(pokemon.name);
      listItem.append(link);
      pokemonList.append(listItem);

      // Attach a click event listener to each list item
      listItem.click(function() {
        // Fetch details for the clicked Pokemon
        $.get(pokemon.url).done(function(details) {
          // Set the modal title and body
          $(".modal-title").text(details.name);
          var body = $("<div>").addClass("pokemon-details");
          body.append($("<p>").text("Height: " + details.height));
          body.append($("<p>").text("Weight: " + details.weight));
          body.append($("<img>").attr("src", details.sprites.front_default));
          $(".modal-body").html(body);

          // Show the modal
          $("#pokemon-modal").modal("show");
        });
      });
    });
  });
});
