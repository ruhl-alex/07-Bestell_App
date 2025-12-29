function render() {
    let contentRefPizzas = document.getElementById("item-container-pizzas");
    contentRefPizzas.innerHTML = "";
    let contentRefSalads = document.getElementById("item-container-salads");
    contentRefSalads.innerHTML = "";
    let contentRefDrinks = document.getElementById("item-container-drinks");
    contentRefDrinks.innerHTML = "";
    for (let indexPizza = 0; indexPizza < PIZZAS.length; indexPizza++) {
        contentRefPizzas.innerHTML += getPizzaTemplate(indexPizza);
    }
    for (let indexSalad = 0; indexSalad < SALADS.length; indexSalad++) {
        contentRefSalads.innerHTML += getSaladTemplate(indexSalad);
    }
    for (let indexDrink = 0; indexDrink < DRINKS.length; indexDrink++) {
        contentRefDrinks.innerHTML += getDrinkTemplate(indexDrink);
    }
}

function getPizzaTemplate(indexPizza) {
        return `
        <div class="item-container">
            <img src="./assets/img/${PIZZAS[indexPizza].img}" alt="${PIZZAS[indexPizza].alt}" class="item-img">
            <div class="item-info">
                <span class="item-title">${PIZZAS[indexPizza].name}</span>
                <span>${PIZZAS[indexPizza].ingredients}</span>
            </div>
            <div class="item-price-info">
                <span class="item-price">${PIZZAS[indexPizza].price.toFixed(2)} €</span>
                <div><button class="item-buy-button" onclick="addPizzaToBasket(${[indexPizza]})">Hinzufügen</button></div>
            </div>
        </div>
        `;
    }

function getSaladTemplate(indexSalad) {
        return `
        <div class="item-container">
            <img src="./assets/img/${SALADS[indexSalad].img}" alt="${SALADS[indexSalad].alt}" class="item-img">
            <div class="item-info">
                <span class="item-title">${SALADS[indexSalad].name}</span>
                <span>${SALADS[indexSalad].ingredients}</span>
            </div>
            <div class="item-price-info">
                <span class="item-price">${SALADS[indexSalad].price.toFixed(2)} €</span>
                <div><button class="item-buy-button">Hinzufügen</button></div>
            </div>
        </div>
        `;
    }

    function getDrinkTemplate(indexDrink) {
        return `
        <div class="item-container">
            <img src="./assets/img/${DRINKS[indexDrink].img}" alt="${DRINKS[indexDrink].alt}" class="item-img">
            <div class="item-info">
                <span class="item-title">${DRINKS[indexDrink].name}</span>
                <span>${DRINKS[indexDrink].ingredients}</span>
            </div>
            <div class="item-price-info">
                <span class="item-price">${DRINKS[indexDrink].price.toFixed(2)} €</span>
                <div><button class="item-buy-button">Hinzufügen</button></div>
            </div>
        </div>
        `;
    }