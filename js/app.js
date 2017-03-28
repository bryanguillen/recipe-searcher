var URL_END_POINT = 'https://api.edamam.com/search';

function getDataFromAPI(searchTerm, callback) {
	var settings = {
		url: URL_END_POINT,
		data: {
			app_id: 'b911c081',
			app_key: 'ada25e7ca4cf4253efd61e25c30c8fa3',
			q: searchTerm,
		},
		success: callback,
		dataType: 'jsonp'
	}
	$.ajax(settings);
}

function displayDataFromAPI(data) {
	//get the title, picture, ingredients, and then calories information 
	//along with serving.
	//playing around in console
	//TODO: remove these variables after know how to manipulate 
	var recipeName = data.hits[0].recipe.label;
	var img = data.hits[0].recipe.image;
	var ingredients = data.hits[0].recipe.ingredientLines;
	var servings = data.hits[0].recipe.yield;
	var caloricIntake = data.hits[0].recipe.calories;
	var diet = data.hits[0].recipe.dietLabels;
	console.log(recipeName);
	console.log(img);
	console.log(ingredients);
	console.log(servings);
	console.log(caloricIntake);
	console.log(diet);
}

//handler 
function submitHandler() {
	$('main').on('click', '.js-search-recipe', function(event) {
		event.preventDefault();
		var query = $('main').find('.food-query').val();
		getDataFromAPI(query, displayDataFromAPI);
	});
}

$(function() {
	submitHandler();
});