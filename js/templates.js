

let template = '';
const informationTmpl = (strongText, spanText) => {
  template += `<span class="information"><strong>${strongText}</strong> ${spanText} </span>`;
  return {
    and: informationTmpl,
    val: template
  };
};

function getRecipeTemplate({recipeName, img, servings, caloricIntake, healthTags, ingredients}) {
  let informationRecipe = informationTmpl('Servings:', servings).and('Calories/servings:', caloricIntake).val;

	return   	`<div class="row recipe">
					<div class="col-12">
						<div class="row">
							<div class="col-12 recipe-label"> ${recipeName} </div>
						</div>
						<div class="row recipe-summary">
							<div class="col-6 img">
								<a href="${img}" data-lightbox="recipe-pic"> <img alt='${recipeName}' src="${img}"></a>
								<span class="information">(Click To See Picture)</span>
							</div>
							<div class="col-6 recipe-information">
                                ${informationTmpl}
								<span class="information health-label-section"><strong>Health Labels:</strong></span>
								<span class="information health-label">${healthTags}</span>
								<button class="information show-ingredients js-click-show"><span>See Ingredients</span></button>
							</div>
						</div>
						<div class="row ingredients-list js-display-ingredients">
							<div class="col-12 ingredients-list">
								<span class="ingredients"><strong>Ingredients:</strong> ${ingredients}  </span>
							</div>
						</div>
					</div>
				</div>`
}

function getResultsTemplate(recipe) {
	return	`<div class="new-search-container">
				<div class="row new-search">
					<div class="col-12">
						<form action="#" class="search-form">
							<fieldset name="search-recipes" class="new-search-fieldset">
								<input type="text" name="food-query" placeholder="eg. (chicken, broccoli)" class="food-query new-query" required />
								<button class="search-button js-search-recipe">Search</button>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
			<div class="recipe-container">
				${recipe}
			</div>
			<div class="more-recipes">
				<button class="more-recipes-button js-more-recipes">More Recipes</button>
			</div>`
}

function getErrorTemplate() {
	return	`<div class="row new-search">
				<div class="col-12">
					<form action="#" class="search-form">
						<fieldset name="search-recipes" class="new-search-fieldset">
							<input type="text" name="food-query" placeholder="eg. (chicken, broccoli)" class="food-query" required />
							<button class="search-button new-search-button js-search-recipe">Search</button>
						</fieldset>
					</form>
				</div>
			</div>
			<div class="row error-msg">
				<div class="col-12">
					<h1>No Results Found</h1>
				</div>
			</div>`
}
