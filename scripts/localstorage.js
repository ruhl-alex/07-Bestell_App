function saveBasketToLocalStorage() {
    localStorage.setItem("BASKET", JSON.stringify(BASKET));
}

function getBasketFromLocalStorage() {
    let myBasket = JSON.parse(localStorage.getItem("BASKET"));

    if (myBasket !== null) {
        BASKET = myBasket;
    }
    return;
}

function checkLocalStorage () {
    getBasketFromLocalStorage();
    if (BASKET.length > 0) {
        renderBasket();
    }
    return;
}
