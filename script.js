function addItemToBasket(index) {
    changeBasketDisplay();
    const item = ITEMS[index];
    const existingItem = BASKET.find(basketItem => basketItem.id === item.id);

    if (existingItem) {
        existingItem.qty += 1;
    }
    else {
        BASKET.push({
            id: item.id,
            name: item.name,
            price: item.price,
            qty: 1
        });
    }
    calculateTotalPrice();
    renderBasket();
}

function renderBasket() {
    let contentRefBasket = document.getElementById("added-items");
    contentRefBasket.innerHTML = "";
    for (let index = 0; index < BASKET.length; index++) {
        contentRefBasket.innerHTML += displayAddedItemsOnBasket(index);
    }
}

function changeBasketDisplay() {
    let contentRefEmptyBasket = document.getElementById("empty-basket");
    let contentRefFilledBasket = document.getElementById("filled-basket");

    contentRefEmptyBasket.classList.add("d-none");
    contentRefFilledBasket.classList.remove("d-none");
}

function calculateTotalPrice() {
    const contentRefTotalPrice = document.getElementById("id-basket-amount");
    let totalPrice = 0;

    contentRefTotalPrice.innerHTML = "";
    for (let index = 0; index < BASKET.length; index++) {
        totalPrice += BASKET[index].price * BASKET[index].qty;
    }
    contentRefTotalPrice.innerHTML += displayTotalPrice(totalPrice);
}

function increaseQty(index) {
    const item = BASKET[index];
    item.qty += 1;
    calculateTotalPrice();
    renderBasket();
}

function decreaseQty(index) {
    const item = BASKET[index];
    item.qty -= 1;
    calculateTotalPrice();
    renderBasket();
}

function deleteItem(index) {
    BASKET.splice(index, 1);
    calculateTotalPrice();
    renderBasket();
}