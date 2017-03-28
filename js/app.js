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
	console.log(data);
	//so far returns jsonp successfully
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