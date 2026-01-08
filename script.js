function addItemToBasket(index) {
    changeBasketDisplay();
    const item = ITEMS[index];
    const existingItem = BASKET.find(basketItem => basketItem.id === item.id);

    if (existingItem) {existingItem.qty += 1;}
    else {
        BASKET.push({
            id: item.id,
            name: item.name,
            price: item.price,
            qty: 1
        });
    }
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

    if (window.innerWidth > 760) {
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

function changeBasketAmount(index, art) {
    const item = BASKET[index];

    if (art === 1) {item.qty += 1;}
    else if (art === 2) {item.qty -= 1;
        if (item.qty <= 0) {
            BASKET.splice(index, 1);
        }}
    else if (art === 3) {BASKET.splice(index, 1);}
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

function basketCounter() {
    const basketCounter = document.getElementById("basket-amount-counter");
    const basketImg = document.getElementById("basekt-img1");

    for (let index = 0; index < BASKET.length; index++) {
        
    }
}

function checkIfMobile() {
    const emptyBasket = document.getElementById('empty-basket');
    const filledBasket = document.getElementById('filled-basket');
    const emptyBasketButton = document.getElementById('close-empty-basket');
    const filledBasketButton = document.getElementById('close-filled-basket');

    if (window.innerWidth < 760) {
        emptyBasket.classList.add("d-none");
        filledBasket.classList.add("d-none");
    }
    if (window.innerWidth > 760) {
        emptyBasketButton.classList.add("d-none");
        filledBasketButton.classList.add("d-none");
    }
}

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

function closeBasket() {
    const contentRefEmptyBasket = document.getElementById("empty-basket");
    const contentRefFilledBasket = document.getElementById("filled-basket");

    contentRefEmptyBasket.classList.add("d-none");
    contentRefFilledBasket.classList.add("d-none");
}