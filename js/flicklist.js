
//two empty arrays within javascript object
var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "9b45dd869a208f34fd28ec978dd94f50" // TODO 0 put your api key here (DONE)
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);
			
			// TODO 2 (DONE)
			// update the model, setting its .browseItems property equal to the movies we recieved in the response
			// when response comes back from ajax request, console.log 'response' (data that came back from API as a Javascript object) to find that movies reside in .results
			//results itself is an array of objects (in this case the movies)
			model.browseItems = response.results;
			console.log("Here is the model:");
			console.log(model);
			// invoke the callback function that was passed in. 
			callback();
		}
	});
  
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  // TODO 7 (DONE)
  // clear everything from both lists
  $("#section-watchlist ul").empty();
  $("#section-browse ul").empty();
  // TODO 6 (DONE)
  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section - from wathclistItems array in the model
	model.watchlistItems.forEach(function(movie) {
		var itemView = $("<li></li>").text(movie.original_title);
		$("#section-watchlist ul").append(itemView);
	});
  // for each movie on the current browse list, 
	model.browseItems.forEach(function(movie) {
		// TODO 3 (DONE)
		// insert a list item into the <ul> in the browse section
		//.text(movie.whatever) because we called it movie in function call**
		var title = $("<p></p>").text(movie.original_title);
		//studio asked to wrap paragraph in li tag

		// TODO 4 & 5(DONE)
		// the list item should include a button that says "Add to Watchlist"
		var button = $("<button></button>").text("Add to Watchlist").click(function() {
			model.watchlistItems.push(movie)
			render();
			console.log("click!");
			console.log(model);
		});
		
		var itemView = $("<li></li>").append(title).append(button);
		
		$("#section-browse ul").append(itemView);
		
		// TODO 5 (DONE-added to 4)
		// when the button is clicked, this movie should be added to the model's watchlist and render() should be called again
		
  });
  
}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});

