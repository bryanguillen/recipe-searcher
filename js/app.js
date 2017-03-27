var URL_END_POINT = 'https://api.edamam.com/search';

function getDataFromAPI(URL_END_POINT, callback) {
	//do something here
}

function submitHandler() {
	$('main').on('click', '.js-search-recipe', function(event) {
		event.preventDefault();
		//here, collect input and get data from query
		//TODO: Figure out home for api code.
		//it is above submit handler!!!
		//traverse food flexible enough for if another input field is added
		var food = $(this).parents('form').find('.food').val();
	});
}

$(function() {
	submitHandler();
});