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
    saveBasketToLocalStorage();
    render();
}

function renderBasket() {
    let contentRefBasket = document.getElementById("added-items");
    contentRefBasket.innerHTML = "";
    for (let index = 0; index < BASKET.length; index++) {
        contentRefBasket.innerHTML += displayAddedItemsOnBasket(index);
    }
}

function changeBasketDisplay() {
    const contentRefEmptyBasket = document.getElementById("empty-basket");
    const contentRefFilledBasket = document.getElementById("filled-basket");

    contentRefEmptyBasket.classList.add("d-none");
    contentRefFilledBasket.classList.remove("d-none");
}

function changeBasketDisplayToEmpty() {
    if (!BASKET.length) {
        const contentRefEmptyBasket = document.getElementById("empty-basket");
        const contentRefFilledBasket = document.getElementById("filled-basket");

        contentRefEmptyBasket.classList.remove("d-none");
        contentRefFilledBasket.classList.add("d-none");
    }
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
    saveBasketToLocalStorage();
    renderBasket();
}

function decreaseQty(index) {
    const item = BASKET[index];
    item.qty -= 1;
    calculateTotalPrice();
    saveBasketToLocalStorage();
    renderBasket();
}

function deleteItem(index) {
    BASKET.splice(index, 1);
    calculateTotalPrice();
    renderBasket();
    changeBasketDisplayToEmpty();
    saveBasketToLocalStorage();
    render();
}

function order() {
    const dialogRef = document.getElementById("item-bought-dialog");
    const contentRefFilledBasket = document.getElementById("filled-basket");

    BASKET = [];
    saveBasketToLocalStorage();
    render();
    contentRefFilledBasket.classList.add("d-none");
    dialogRef.showModal();
    setTimeout(() => {dialogRef.close();}, 3000);
}

function closeDialog() {
    const dialogRef = document.getElementById("item-bought-dialog");

    dialogRef.close();
}