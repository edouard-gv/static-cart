import { priceFormat, mapConcatMap } from "./formaters.js";

export class ShoppingCart {
    constructor() {
        this.itemsCount = 0;
        this.totalAmount = 0;
        this.cartLines = {}
    }

    addItemToCart(product) {
        this.totalAmount += product.price;
        this.itemsCount++;
        this.cartLines[product.id] =
            (this.cartLines[product.id]
                ? { product: product, quantity: this.cartLines[product.id].quantity + 1, totalAmount: this.cartLines[product.id].totalAmount + product.price }
                : { product: product, quantity: 1, totalAmount: product.price });
        this.render();
    }



    render() {
        document.querySelector(".cart").innerHTML =
            `<h2>Shopping Cart</h2>`+ (this.itemsCount > 0 ? `
             <ul class="cart-lines">
             ${mapConcatMap(this.cartLines, cartLine =>
                `<li class="cart-line">
                    <span class="totalQuantity">${cartLine.quantity}</span>
                    <span class="name">${cartLine.product.name}(s)</span>
                    <span class="price">${priceFormat.format(cartLine.product.price)}</span>
                    <span class="totalAmount">${priceFormat.format(cartLine.totalAmount)}</span>
                </li>`)}
             </ul>
             <hr>` : "") + `
            <div class="cart-summary">
                ${this.itemsCount} item(s) for a total amount of ${priceFormat.format(this.totalAmount)}.</div>
            </div>`;
    }
}