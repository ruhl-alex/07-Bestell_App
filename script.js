function displayBasket() {
    const RefBasket = document.getElementById("basket");
    if (BASKET.length === 0) {
        RefBasket.innerHTML = "";
        RefBasket.innerHTML += displayEmptyBasket();
    }
    return;
}

function addItemToBasket(index) {
    // changeBasketDisplay();
    const item = ITEMS[index];
    const existingItem = BASKET.find(basketItem => basketItem.id === item.id);

    if (existingItem) { existingItem.qty += 1; }
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
    let contentRefBasket = document.getElementById("basket");

    contentRefBasket.innerHTML = "";
    contentRefBasket.innerHTML += displayFilledBasket();
    let contentRefItems = document.getElementById("added-items");
    contentRefItems.innerHTML = "";
    for (let index = 0; index < BASKET.length; index++) {
        contentRefItems.innerHTML += displayAddedItemsOnBasket(index);
    }
    // changeBasketDisplay();
    calculateTotalPrice();
    basketCounter();
}

// function changeBasketDisplay() {
//     const contentRefEmptyBasket = document.getElementById("empty-basket");
//     const contentRefFilledBasket = document.getElementById("filled-basket");

//     if (window.innerWidth > 760) {
//         contentRefEmptyBasket.classList.add("d-none");
//         contentRefFilledBasket.classList.remove("d-none");
//     }
// }

// function changeBasketDisplayToEmpty() {
//     if (!BASKET.length) {
//         const contentRefEmptyBasket = document.getElementById("empty-basket");
//         const contentRefFilledBasket = document.getElementById("filled-basket");

//         contentRefEmptyBasket.classList.remove("d-none");
//         contentRefFilledBasket.classList.add("d-none");
//     }
// }

function calculateTotalPrice() {
    const contentRefTotalPrice = document.getElementById("id-basket-amount");
    let totalPrice = 0;

    contentRefTotalPrice.innerHTML = "";
    for (let index = 0; index < BASKET.length; index++) {
        totalPrice += BASKET[index].price * BASKET[index].qty;
    }
    contentRefTotalPrice.innerHTML += displayTotalPrice(totalPrice);
}

function changeBasketAmountInTemplate(ITEMIndex, art) {
    const itemIndexOfBasket = BASKET.findIndex(e => e.id === ITEMIndex);
    const item = BASKET[itemIndexOfBasket];
    if (art === 1) { item.qty += 1; }
    else if (art === 2) {
        item.qty -= 1;
        if (item.qty <= 0) {BASKET.splice(itemIndexOfBasket, 1);}
    }
    else if (art === 3) {
        BASKET.splice(itemIndexOfBasket, 1);
        displayEmptyBasket();
    }
    calculateTotalPrice();
    renderBasket();
    saveBasketToLocalStorage();
    render();
}

function order() {
    const dialogRef = document.getElementById("item-bought-dialog");
    const contentRefBasket = document.getElementById("basket");

    BASKET = [];
    saveBasketToLocalStorage();
    render();
    renderBasket();
    contentRefBasket.innerHTML = displayEmptyBasket();
    if (window.innerWidth > 760) {contentRefBasket.classList.add('d-none');}
    if (window.innerWidth <= 760) {contentRefBasket.classList.toggle('active');}
    dialogRef.showModal();
    setTimeout(() => { dialogRef.close(); }, 3000);
}

function closeDialog() {
    const dialogRef = document.getElementById("item-bought-dialog");
    dialogRef.close();
}

function changeBasketAmount(index, art) {
    const item = BASKET[index];
    if (art === 1) { item.qty += 1; }
    else if (art === 2) {
        item.qty -= 1;
        if (item.qty <= 0) {
            BASKET.splice(index, 1);
        }
    }
    else if (art === 3) {
        BASKET.splice(index, 1);
    }
    calculateTotalPrice();
    renderBasket();
    saveBasketToLocalStorage();
    render();
}

function basketCounter() {
    const basketCounter = document.getElementById("basket-amount-counter");
    const basketImg = document.getElementById("basket-img1");
    let basketAmount = 0;

    for (let index = 0; index < BASKET.length; index++) {
        basketAmount = basketAmount + BASKET[index].qty
    }
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

// function checkIfMobile() {
//     const Basket = document.getElementById('basket');
//     const filledBasketButton = document.getElementById('close-filled-basket');
//     const emptyBasketButton = document.getElementById('close-empty-basket');


//     if (window.innerWidth < 760 && BASKET.length === 0) {
//         emptyBasketButton.classList.remove("d-none");
//         Basket.classList.add("d-none");
//     }
//     if (window.innerWidth < 760 && BASKET.length >= 1) {
//         filledBasketButton.classList.remove("d-none");
//         Basket.classList.add("d-none");
//     }
//     if (window.innerWidth > 760 && BASKET.length >= 1) {
//         filledBasketButton.classList.add("d-none");
//         Basket.classList.remove ("d-none");
//     }

// }

function mobileBasketToggle() {
    let Basket = document.getElementById('basket');

    Basket.classList.toggle('active');
}

function closeBasket() {
    const contentRefBasket = document.getElementById('basket');

    contentRefBasket.classList.toggle('active');
}