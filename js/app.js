//state
var state = {
	from: 0,
	to: 3
}

var URL_END_POINT = 'https://api.edamam.com/search';

function getDataFromAPI(searchTerm, callback) {
	var settings = {
		url: URL_END_POINT,
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
	var length = recipes.length;
	var result = '';
	if(length > 0) {
		recipes.forEach(function(item) {
			var recipeName = item.recipe.label;
			var img = item.recipe.image;
			var servings = item.recipe.yield;
			//calories per serving
			var caloricIntake = item.recipe.calories / servings;
			var ingredients = item.recipe.ingredientLines.join(', ');
			result += createRecipeHTML(recipeName, img, servings, caloricIntake, ingredients);
		});
	}
	else{
		//add error message
	}
	renderRecipes(result);
}

//dom manipulation 
function createRecipeHTML(recipeName, img, servings, caloricIntake, ingredients) {
	return   	'<div class="row recipe">' +
					'<div class="col-12">' +
						'<div class="row js-shown-information">' +
							'<div class="col-12 recipe-label">' + recipeName  + '</div>' +
						'</div>' +
						'<div class="row recipe-summary">' +
							'<div class="col-6 img">' +
								'<img src="' + img + '">' +
							'</div>' +
							'<div class="col-6 recipe-information">' +
								'<span class="information">' + servings + '</span>' +
								'<span class="information">' + caloricIntake + '</span>' +
								'<span class="information health-label-section"><strong>Health Labels</strong></span>' +
								'<span class="information health-label">' + '</span>' +
								'<button class="information js-click-show"><span>See Ingredients</span></button>' +
							'</div>' +
						'</div>' +
						'<div class="row ingredients-list js-display-ingredients">' +
							'<div class="col-12 ingredients-list">' +
								'<span class="ingredients">Ingredients: ' +  ingredients +  '</span>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>';
}

function renderRecipes(recipes) {
	$('main').html('<div class="recipe-container">' + recipes + '</div>');
}

//handler 
function seeIngredientsHandler() {
	$('main').on('click', '.js-click-show', function(event) {
		event.preventDefault();
		$(this).parents('.recipe-summary').next().toggleClass('js-display-ingredients');
	});
}

function submitHandler() {
	$('main').on('click', '.js-search-recipe', function(event) {
		event.preventDefault();
		var query = $('main').find('.food-query').val();
		getDataFromAPI(query, displayDataFromAPI);
	});
}

$(function() {
	submitHandler();
	seeIngredientsHandler();
});