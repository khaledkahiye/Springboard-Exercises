// Find the place where the GIFs will go
let gifArea = $("#gif-area");

// Find the search box
let searchBox = $("#search");

// Make a function to add a GIF
function addGif(gifData) {
  // Check if there are any GIFs
  if (gifData.data.length > 0) {
    // Pick a random GIF
    let randomGif =
      gifData.data[Math.floor(Math.random() * gifData.data.length)];

    // Make a new spot for the GIF
    let gifSpot = $("<div>").addClass("col-md-4 col-12 mb-4");

    // Make the GIF image
    let gifImage = $("<img>")
      .attr("src", randomGif.images.original.url)
      .addClass("w-100");

    // Put the GIF image in the spot
    gifSpot.append(gifImage);

    // Put the spot with the GIF in the GIF area
    gifArea.append(gifSpot);
  }
}

// When the form is sent, do this
$("form").submit(function (event) {
  // Stop the form from doing its normal thing
  event.preventDefault();

  // Get what the user typed
  let searchThing = searchBox.val();

  // Clear the search box
  searchBox.val("");

  // Try to get GIFs
  $.ajax({
    url: "https://api.giphy.com/v1/gifs/search",
    method: "GET",
    data: {
      q: searchThing,
      api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym", // Replace with your API key
    },
    success: function (response) {
      // Add the GIFs to the page
      addGif(response);
    },
    error: function (error) {
      // Something went wrong, tell the user
      alert("Oops, something went wrong. Try again later.");
      console.log("Error:", error);
    },
  });
});

// When the remove button is clicked, do this
$("#remove").click(function () {
  // Clear the GIF area
  gifArea.empty();
});
