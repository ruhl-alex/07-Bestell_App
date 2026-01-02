function render() {
    renderCategory("pizzas", "item-container-pizzas");
    renderCategory("salads", "item-container-salads");
    renderCategory("drinks", "item-container-drinks");
}


function renderCategory(category, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    ITEMS
        .filter(item => item.category === category)
        .forEach(item => {
            container.innerHTML += itemTemplate(item);
        });
}

function itemTemplate(item) {
    const checkItem = BASKET.find(itemInBasket => itemInBasket.id === item.id)
   
    if(!checkItem) {
    return `
        <div class="item-container">
             <img src="./assets/img/${item.img}" alt="${item.alt}" class="item-img">
             <div class="item-info">
                 <span class="item-title">${item.name}</span>
                 <span>${item.ingredients}</span>
             </div>
             <div class="item-price-info">
                 <span class="item-price">${item.price.toFixed(2)} €</span>
                 <div><button class="item-add-button" onclick="addItemToBasket(${item.id})">Hinzufügen</button></div>
             </div>
         </div>
    `;
    }
    else {
        return `
        <div class="item-container">
            <img src="./assets/img/${item.img}" alt="${item.alt}" class="item-img">
             <div class="item-info">
                 <span class="item-title">${item.name}</span>
                 <span>${item.ingredients}</span>
             </div>
             <div class="item-price-info">
                 <span class="item-price">${item.price.toFixed(2)} €</span>
                <div class="item-added-info2"><button class="item-added-info">Im <span class="added-basket-img"></span></button><button class="item-added-button" onclick="addItemToBasket(${item.id})">+</button></div>
            </div>  
        </div>
        `;
    }
}

function displayAddedItemsOnBasket(index) {
    if (BASKET[index].qty > 1) {
    return `
            <div class="basket-added-item">
            <div class="basket-upper-area">
            <span class="basket-dish">${BASKET[index].qty} x ${BASKET[index].name}</span>
            <img src="./assets/icons/trash.png" id="button-decrease1" onclick="deleteItem(${index})" class="qtyButtontrashUpRight"><br>
            </div>
            <div class="basket-desc-qty-price">
            <div id="basket-amount-container" class="set-amount">
                <button id="button-decrease2" onclick="decreaseQty(${index})" class="qtyButton">-</button>
                    1
                <button id="button-increase" onclick="increaseQty(${index})" class="qtyButton">+</button>
            </div>
            <span> ${(BASKET[index].price * BASKET[index].qty).toFixed(2)} €</span></div>
            </div>
    `;
    }
    else {
        return `
            <div class="basket-added-item">
            <div class="basket-upper-area">
            <span class="basket-dish">${BASKET[index].qty} x ${BASKET[index].name}</span>
            </div>
            <div class="basket-desc-qty-price">
            <div id="basket-amount-container" class="set-amount">
                <img src="./assets/icons/trash.png" id="button-decrease1" onclick="deleteItem(${index})" class="qtyButtontrash">
                    1
                <button id="button-increase" onclick="increaseQty(${index})" class="qtyButton">+</button>
            </div>
            <span> ${(BASKET[index].price * BASKET[index].qty).toFixed(2)} €</span></div>
            </div>
    `;
    }
}

function displayTotalPrice(totalPrice) {
    return `
        <table class="basket-amount-table1">
            <tr>
                <td>Zwischensumme:</td>
                <td>${totalPrice.toFixed(2)} €</td>
            </tr>
            <tr>
                <td>Lieferkosten:</td>
                <td>5,00 €</td>
            </tr>
        </table>
        <table class="basket-amount-table2">
            <tr>
                <td>Gesamt:</td>
                <td>${(totalPrice + 5).toFixed(2)} €</td>
            </tr>
        </table>
        <button onclick="order()" class="basket-order-button">Bestellen (${(totalPrice + 5).toFixed(2)} €)</button>
    `;
}