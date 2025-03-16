import "./catalog.js";
import "./cart.js";

window.addEventListener("load", async () => {

    let shoppingCart = document.querySelector("shopping-cart");

    document.addEventListener("addItemToCart", (event) => {
        shoppingCart.addItemToCart(event.detail);
    });
});
