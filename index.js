import { ProductCatalog } from "./catalog.js";
import { ShoppingCart } from "./cart.js";

window.addEventListener("load", async () => {
    let productCatalog = new ProductCatalog();
    await productCatalog.render();
    productCatalog.registerHandlers();

    let shoppingCart = new ShoppingCart();
    shoppingCart.render();

    document.addEventListener("addItemToCart", (event) => {
        shoppingCart.addItemToCart(event.detail);
    });
});
