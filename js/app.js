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
	//hits is array that contains the recipes..
	var recipes = data.hits;
	var length = recipes.length; //if length === 0, no recipes were found for searchTerm
	var result = '';
	if(length > 0) {
		recipes.forEach(function(item) {
			var recipeName = item.recipe.label;
			var img = item.recipe.image;
			var servings = item.recipe.yield;
			var caloricIntake = Math.floor(item.recipe.calories / servings); //calories per serving
			var healthTags = item.recipe.healthLabels.join(', '); 
			var ingredients = item.recipe.ingredientLines.join(', ');
			result += createRecipeHTML(recipeName, img, servings, caloricIntake, healthTags, ingredients);
		});
		renderRecipes(result);
	}
	else{
		renderErrorMessage();
	}
}

//dom manipulation 
function createRecipeHTML(recipeName, img, servings, caloricIntake, healthTags, ingredients) {
	return   	'<div class="row recipe">' +
					'<div class="col-12">' +
						'<div class="row">' +
							'<div class="col-12 recipe-label">' + recipeName  + '</div>' +
						'</div>' +
						'<div class="row recipe-summary">' +
							'<div class="col-6 img">' +
								'<a href="' + img + '" data-lightbox="recipe-pic"> <img src="' + img + '"></a>' +
								'<span class="information">(Click To Enlarge)</span>' +
							'</div>' +
							'<div class="col-6 recipe-information">' +
								'<span class="information"><strong>Servings:</strong> ' + servings + '</span>' +
								'<span class="information"><strong>Calories/serving:</strong> ' + caloricIntake + '</span>' +
								'<span class="information health-label-section"><strong>Health Labels:</strong></span>' +
								'<span class="information health-label">' + healthTags + '</span>' +
								'<button class="information show-ingredients js-click-show"><span>See Ingredients</span></button>' +
							'</div>' +
						'</div>' +
						'<div class="row ingredients-list js-display-ingredients">' +
							'<div class="col-12 ingredients-list">' +
								'<span class="ingredients"><strong>Ingredients:</strong> ' +  ingredients +  '</span>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>';
}

function renderRecipes(recipes) {
	//first check if this is a new search. 
	if(state.from < 5) {
		$('main').html( '<div class="search-container">' +
						'<div class="row new-search">' +
							'<div class="col-12">' +
								'<form action="#" class="search-form">' +
									'<fieldset name="search-recipes" class="new-search-fieldset">' +
										'<input type="text" name="food-query" placeholder="eg. (chicken, broccoli)" class="food-query new-query" required />' +
										'<button class="search-button js-search-recipe">Search</button>' +
									'</fieldset>' +
								'</form>' +
							'</div>' +
						'</div>' +
						'</div>'+
						'<div class="recipe-container">' + 
							recipes + 
						'</div>' +
						'<div class="more-recipes">' +
							'<button class="more-recipes-button js-more-recipes">More Recipes</button>' +
						'</div>');
	}
	else {
		$('.recipe-container').append(recipes);
	}
}

function renderErrorMessage() {
	$('main').html(
					'<div class="row new-search">' +
						'<div class="col-12">' +
							'<form action="#" class="search-form">' +
								'<fieldset name="search-recipes">' +
									'<input type="text" name="food-query" placeholder="eg. (chicken, broccoli)" class="food-query" required />' +
									'<button class="search-button new-search-button js-search-recipe">Search</button>' +
								'</fieldset>' +
							'</form>' +
						'</div>' +
					'</div>' +
					'<div class="row error-msg">' + 
						'<div class="col-12">' +
							'<h1>No Results Found</h1>' + 
						'</div>' + 
					'</div>');
}

//handlers 
function moreRecipesHandler() {
	$('main').on('click', '.js-more-recipes', function(event) {
		event.preventDefault();
		state.from += 5;
		state.to += 5;
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