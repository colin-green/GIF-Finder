// Setting important variables
var api_key = "4mdUI6nTvQxKzL0xYF6JLTpP0R9UUllt";
var topics = ["Cats", "Pizza", "Cheeseburgers", "Video Games", "Beach", "Anime", "Baby Animals"];
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + api_key + "&limit=10&q=";

// Bootstrap button aesthetics
var button_colors = ["btn btn-danger", "btn btn-warning", "btn btn-success", "btn btn-info", "btn btn-primary", "btn btn-secondary", "btn btn-dark"];
var button_color_counter = 0;

// Using a for-loop to create all the buttons
for (let i = 0; i < topics.length; i++) {

    // Make a new button element and assign to variable
    var newButton = $("<button>");

    // Make type = button (makes page not refresh)
    newButton.attr("type", "button");

    // Bootstrap Aesthetics
    newButton.addClass(button_colors[button_color_counter]);
    
    if (button_color_counter == 6) {
        button_color_counter = 0;
    } else {
        button_color_counter++;
    }

    // Differentiate topic buttons from submit button
    newButton.addClass("topics");

    // Make the id of each button equal to the name
    newButton.attr("id", topics[i].toLowerCase());

    // Make the text on the button equal to the name
    newButton.html(topics[i]);

    // Append buttons to the buttons div
    $("#buttons-div").append(newButton);
}


// Setting up the functionality for clicking the submit button
$("#submit").click(createButton);

// Setting up the functionality for clicking topic buttons
$(".customButton").click(populateGIFs);
$(".topics").click(populateGIFs);

function populateGIFs() {

  // Some variety in the GIFs you receive
  var offset = Math.floor(Math.random() * 101).toString();

  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: queryURL + this.id + "&offset=" + offset,
    method: "GET"
  })

    // After data comes back from the request
    .then(function(response) {
        
      // Clear the gif div
        $("#gif-div").empty();

        // Log the response from GIPHY server
        console.log(response);

        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var newDiv = $("<div>");
          newDiv.attr("id", "imgDiv");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());

          // Creating and storing an image tag
          var newImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          newImage.attr("src", results[i].images.fixed_height_still.url);
          // Setting attributes for the image for play/pause functionality
          newImage.attr("data-still", results[i].images.fixed_height_still.url);
          newImage.attr("data-animate", results[i].images.fixed_height.url);
          newImage.attr("data-state", "still");
          newImage.addClass("gif");

          // Appending the paragraph and image tag to the animalDiv
          newDiv.append(p);
          newDiv.append(newImage);

          // Appendng the newDiv to the HTML page in the "#gifs-div" div
          $("#gif-div").append(newDiv);
        }
        
        // When you click on a gif, toggle play/pause
        $(".gif").click(playPause);

      })

}

function playPause() {

  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  console.log("You have clicked an image");
  var state = $(this).attr("data-state");
  console.log(state);
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

}

function createButton() {
    // Take whatever is in the input field and assign it to a variable
    var userInput = $("#userTopic").val();
    $("#userTopic").val('');

    // Make a new button element and set it to a variable
    var newButton = $("<button>");

    // Make type = button (makes page not refresh)
    newButton.attr("type", "button");

    // Bootstrap Aesthetics
    newButton.addClass(button_colors[button_color_counter]);

    if (button_color_counter == 6) {
        button_color_counter = 0;
    } else {
        button_color_counter++;
    }

    // Differentiate topic buttons from submit button
    newButton.addClass("topics");
    newButton.addClass("customButton");

    // Make id of the new button equal to user input variable
    newButton.attr("id", userInput.toLowerCase());

    // Make text on the new button equal to the user input variable
    newButton.html(userInput);

    // Append the new button to the buttons div
    $("#buttons-div").append(newButton);
}