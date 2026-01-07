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
    // calculateTotalPrice();
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
    changeBasketDisplay();
    calculateTotalPrice();
    basketCounter();
}

function changeBasketDisplay() {
    const contentRefEmptyBasket = document.getElementById("empty-basket");
    const contentRefFilledBasket = document.getElementById("filled-basket");

    if(window.innerWidth > 760) {
    contentRefEmptyBasket.classList.add("d-none");
    contentRefFilledBasket.classList.remove("d-none");
    }
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
    renderBasket();
    contentRefFilledBasket.classList.add("d-none");
    dialogRef.showModal();
    setTimeout(() => { dialogRef.close(); }, 3000);
}

function closeDialog() {
    const dialogRef = document.getElementById("item-bought-dialog");

    dialogRef.close();
}

function basketCounter() {
    const basketCounter = document.getElementById("basket-amount-counter");
    const basketImg = document.getElementById("basekt-img1");

    basketAmount = BASKET.length;
    basketCounter.innerHTML = basketAmount;
    if (BASKET.length === 0) {
        basketCounter.classList.add("d-none");
        basketImg.src = "./assets/icons/basket_white.png";
    }
    if (BASKET.length > 0) {
        basketCounter.classList.remove("d-none");
        basketImg.src = "./assets/icons/basket_orange.png";
    }
}

function checkIfMobile() {
    const emptyBasket = document.getElementById('empty-basket');
    const filledBasket = document.getElementById('filled-basket');

    if (window.innerWidth < 760) {
        emptyBasket.classList.add("d-none");
        filledBasket.classList.add("d-none");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkIfMobile();
});

function mobileBasketToggle() {
    let emptyBasket = document.getElementById('empty-basket');
    let filledBasket = document.getElementById('filled-basket');

    if (basketAmount > 0) {
        filledBasket.classList.toggle('d-none');
    }
    else {
        emptyBasket.classList.toggle('d-none');
    }
}

