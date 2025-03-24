import { priceFormat } from "./catalog.js";

class ShoppingCart extends HTMLElement {

    connectedCallback() {
        this.itemsCount = 0;
        this.totalAmount = 0;
        this.cartLines = {}
        this.render();
    }

    addItemToCart(product) {
        this.totalAmount += product.price;
        this.itemsCount++;
        this.cartLines[product.productId] =
            (this.cartLines[product.productId]
                ? { product: product, quantity: this.cartLines[product.productId].quantity + 1, totalAmount: this.cartLines[product.productId].totalAmount + product.price }
                : { product: product, quantity: 1, totalAmount: product.price });
        this.render();
    }

    render() {
        let cartLines = "";
        for (let productId in this.cartLines) {
            let cartLine = this.cartLines[productId];
            let product = cartLine.product;
            cartLines +=
                `<cart-line product-name="${product.name}" product-price="${product.price}" quantity="${cartLine.quantity}" total-amount="${cartLine.totalAmount}"></cart-line>`;
        }

        this.innerHTML =
            `<h2>Shopping Cart</h2>
             <div class="cart-lines">
             ${cartLines}`+(cartLines ? `<hr>` : "")+`
             <div>${this.itemsCount} item(s) for a total amount of ${priceFormat.format(this.totalAmount)}.</div>
             </div>`;
    }
}

customElements.define("shopping-cart", ShoppingCart);

class CartLine extends HTMLElement {
    connectedCallback() {
        this.product = {
            name: this.getAttribute("product-name"),
            price: Number(this.getAttribute("product-price"))
        }
        this.quantity = Number(this.getAttribute("quantity"))
        this.totalAmount = Number(this.getAttribute("total-amount"))
        this.render();
    }

    render() {
        this.innerHTML =
            `<div class="cart-line">
                <span class="totalQuantity">${this.quantity}</span>
                <span class="name">${this.product.name}(s)</span> at 
                <span class="price">${priceFormat.format(this.product.price)}</span> for a total amount of
                <span class="totalAmount">${priceFormat.format(this.totalAmount)}</span>
            </div>`;
    }
}

customElements.define("cart-line", CartLine);