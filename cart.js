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
            `<h2>Shopping Cart</h2>`
            + (this.itemsCount > 0 ? `
             <div class="cart-lines">
             <div class="cart-headline quantity">Quantity</div>
             <div class="cart-headline designation">Designation</div>
             <div class="cart-headline price">Unit Price</div>
             <div class="cart-headline total-amount">Total Price</div>
             ${mapConcatMap(this.cartLines, cartLine =>
                `<div class="quantity">${cartLine.quantity}</div>
                <div class="designation">${cartLine.product.designation}</div>
                <div class="price">${priceFormat.format(cartLine.product.price)}</div>
                <div class="total-amount">${priceFormat.format(cartLine.totalAmount)}</div>
                `)}
             </div>
             <hr>` : "") + `
            <div class="cart-summary">
                ${this.itemsCount} item(s) for a total amount of ${priceFormat.format(this.totalAmount)}.</div>
            </div>`;
    }
}