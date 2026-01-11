function render() {
    displayBasket();
    basketCounter();
    getBasketFromLocalStorage();
    checkLocalStorage();
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

    if (!checkItem) {
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
                <div class="item-added-info2"></button><button class="item-added-button" onclick="changeBasketAmountInTemplate(${item.id}, 2)">-</button></button><button class="item-added-button" onclick="changeBasketAmountInTemplate(${item.id}, 1)">+</button></div>
            </div>  
        </div>
        `;
    }
}

function displayEmptyBasket() {
    return `
            <div id="close-empty-basket" class="close-button-area"><button onclick="closeBasket()" class="close-button">X</button></div>
            <h2 class="basket-headline">Dein Warenkorb</h2>
            <span class="basket-desc">Dein Warenkorb ist aktuell leer.<br><br>Wähle jetzt ein leckeres Gericht
                aus unserem Menü aus!</span>
            <div class="empty-basket-img" aria-label="Empty Basket"></div>
    `;
}

function displayFilledBasket() {
    return `
            <div id="close-filled-basket" class="close-button-area"><button onclick="closeBasket()" class="close-button">X</button></div>
            <h2 class="basket-headline">Dein Warenkorb</h2>
            <div id="added-items" class="basket-added-items">
                <div class="basket-added-item">

                </div>
            </div>
            <div id="id-basket-amount" class="basket-amount">

            </div>
    `;
}

function displayAddedItemsOnBasket(index) {
    if (BASKET[index].qty > 1) {
        return `
            <div class="basket-added-item">
            <div class="basket-upper-area">
            <span class="basket-dish">1 x ${BASKET[index].name}</span>
            <img src="./assets/icons/trash.png" id="button-decrease1" onclick="changeBasketAmount(${index}, 3)" class="qtyButtontrashUpRight"><br>
            </div>
            <div class="basket-desc-qty-price">
            <div id="basket-amount-container" class="set-amount">
                <button id="button-decrease2" onclick="changeBasketAmount(${index}, 2)" class="qtyButton">-</button>
                    ${BASKET[index].qty}
                <button id="button-increase" onclick="changeBasketAmount(${index}, 1)" class="qtyButton">+</button>
            </div>
            <span> ${(BASKET[index].price * BASKET[index].qty).toFixed(2)} €</span></div>
            </div>
    `;
    }
    else {
        return `
            <div class="basket-added-item">
            <div class="basket-upper-area">
            <span class="basket-dish">1 x ${BASKET[index].name}</span>
            </div>
            <div class="basket-desc-qty-price">
            <div id="basket-amount-container" class="set-amount">
                <img src="./assets/icons/trash.png" id="button-decrease1" onclick="changeBasketAmount(${index}, 3)" class="qtyButtontrash">
                    ${BASKET[index].qty}
                <button id="button-increase" onclick="changeBasketAmount(${index}, 1)" class="qtyButton">+</button>
            </div>
            <span> ${(BASKET[index].price * BASKET[index].qty).toFixed(2)} €</span></div>
            </div>
    `;
    }
}

function displayTotalPrice(totalPrice, shippingFee) {
    return `
        <table class="basket-amount-table1">
            <tr>
                <td>Zwischensumme:</td>
                <td>${totalPrice.toFixed(2)} €</td>
            </tr>
            <tr>
                <td>Lieferkosten:</td>
                <td>${shippingFee.toFixed(2)} €</td>
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