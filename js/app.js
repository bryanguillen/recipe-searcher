//state mgmt
var state = {
	//from through to are the indices of recipes we would like to access from api. 
	from: 0,
	to: 5,
	currentQuery: null
}

function resetState(state) {
	//reset state for when new search is submitted
	state.from = 0;
	state.to = 5;
	state.currentQuery = null; 
}

function getNewIndices(state) {
	//fetching new data from api
	state.from += 5;
	state.to += 5;
}

function getDataFromAPI(searchTerm, callback) {
	var settings = {
		url: 'https://api.edamam.com/search',
		data: {
			app_id: 'b911c081',
			app_key: 'ada25e7ca4cf4253efd61e25c30c8fa3',
			q: searchTerm,
			from: state.from,
			to: state.to
		},
		success: callback,
		dataType: 'jsonp'
	}
	$.ajax(settings);
}

function displayDataFromAPI(data) {
	//hits is array that contains the search results.
	var recipes = data.hits;
	var length = recipes.length; //if length === 0, no recipes were found for searchTerm
	var result = '';
	if(length > 0) {
		recipes.forEach(function(item) {
			var item = item.recipe //recipe array contains all of the relevant information
			var recipe = {
				recipeName: item.label, 
				img: item.image, 
				servings: item.yield, 
				caloricIntake: Math.floor(item.calories / item.yield), 
				healthTags: item.healthLabels.join(', '),
				ingredients: item.ingredientLines.join(', ')
			}
			var {recipeName, img, servings, caloricIntake, healthTags, ingredients} = recipe;
			result += getRecipeTemplate({recipeName, img, servings, caloricIntake, healthTags, ingredients});
		});
		renderResults(result);
	}
	else{
		renderErrorMessage();
	}
}

//dom manipulation 
//getTemplate functions in templates.js
function renderResults(recipes) {
	//first check if this is a new search. 
	if(state.from < 5) {
		$('main').html(getResultsTemplate(recipes));
	}
	else {
		$('.recipe-container').append(recipes);
	}
}

function renderErrorMessage() {
	$('main').html(getErrorTemplate());
}

//handlers 
function moreRecipesHandler() {
	$('main').on('click', '.js-more-recipes', function(event) {
		event.preventDefault();
		getNewIndices(state);
		getDataFromAPI(state.currentQuery, displayDataFromAPI);
	});
}

function seeIngredientsHandler() {
	$('main').on('click', '.js-click-show', function(event) {
		event.preventDefault();
		$(this).parents('.recipe-summary').next().toggleClass('js-display-ingredients');
	});
}

function submitHandler() {
	$('main').on('click', '.js-search-recipe', function(event) {
		event.preventDefault();
		resetState(state);
		var query = $('main').find('.food-query').val();
		state.currentQuery = query //keep track of query in state global
		getDataFromAPI(query, displayDataFromAPI);
	});
}

$(function() {
	submitHandler();
	seeIngredientsHandler();
	moreRecipesHandler();
});