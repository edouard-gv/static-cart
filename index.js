import "./catalog.js";
import "./cart.js";

window.addEventListener("load", async () => {

    let shoppingCart = document.querySelector("shopping-cart");

    document.querySelectorAll("product-details").forEach(button => {
        button.addEventListener("addItemToCart", (event) => {
            shoppingCart.addItemToCart(event.detail);
        });
    });
});
