
function Recipe() {
    this.categories = [];
    this.filterCategories = [];
    
    this.cardElements = document.querySelector('.js-cards');
    this.err = null;

    this.API = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    
    this.getFromAPI();
}

Recipe.prototype.getFromAPI = function () {
    let self = this;

    fetch(this.API)
        .then(
            function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(function(data) {
                console.log('fetch data', data.categories[0]);
                self.categories = data.categories;
                self.filterCategories = self.categories;
                self.renderHTML();
            });
            }
        )
        .catch(function (error) {
            self.err = error;
        });
    
};

Recipe.prototype.renderHTML = function () {
    var tmpHtml = '';

    // Create html for each card (object)
    for (let i = 0; i < this.filterCategories.length; i++) {
        let card = this.filterCategories[i];

        let cardHTML = 
            `<div class="card" style="background-image: url(${card.strCategoryThumb})">
                <div class="card__wrapper">
                        <h1 class="card__title">${card.strCategory}</h1>
                        <p class="card__desc">
                            ${card.strCategoryDescription}
                        </p>
                </div>
            </div>`;
            tmpHtml+= cardHTML;
    }
    this.cardElements.innerHTML = tmpHtml;

};

Recipe.prototype.findItem = function(query) {
    console.log(query);
    this.filterCategories = this.categories.filter(function (card) {
        console.log(card.strCategory.toLowerCase() === query);
        return card.strCategory.toLowerCase().search(new RegExp(query, 'g'));
    });
    this.renderHTML();
};

/* Init
-------------------------------------------------- */
var recipe = new Recipe();

var searchEl = document.querySelector('.search');
searchEl.addEventListener('keyup', function (e) {
    var query = e.target.value;
    recipe.findItem(query);
});