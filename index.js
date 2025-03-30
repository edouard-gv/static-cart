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

    //Pour récupérer un panier à partir d'une URL
    //

    //Pour construire le code à partir du panier
    //Si 1 x 001, 3 x 002 et 4 x 007 => 100130024007
    //A convertir en hexa => 175036ea47
    //A convertir en string en itérant avec String.fromCharCode sur chaque ? => '\x17\x50\x36\xea\x47'
    //A convertir en base64 via btoa

    //Inversement : atob
    //on converti en hexa en itérant et appliquant sum (.chatAtCode(i) * 16^i)

});
