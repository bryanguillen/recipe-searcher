var template = `<div class="row recipe">
					<div class="col-12"> 
						<div class="row"> 
							<div class="col-12 recipe-label"> + ${recipeName}  + </div>`
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
				'</div>`;