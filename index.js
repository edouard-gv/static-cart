class ShoppingCart extends HTMLElement {
    static priceFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

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
             <div class="cart">
             ${cartLines}`+(cartLines ? `<hr>` : "")+`
             <div>${this.itemsCount} item(s) for a total amount of ${ShoppingCart.priceFormat.format(this.totalAmount)}.</div>
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
                <span class="price">${ShoppingCart.priceFormat.format(this.product.price)}</span> for a total amount of
                <span class="totalAmount">${ShoppingCart.priceFormat.format(this.totalAmount)}</span>
            </div>`;
    }
}

customElements.define("cart-line", CartLine);

class ProductCatalog extends HTMLElement {
    async connectedCallback() {
        this.catalog = await this.fetchCatalog();
        this.render();
    }

    async fetchCatalog() {
        let catalog = [];
        try {
            const response = await fetch("catalog.json");
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            catalog = (JSON.parse((await response.text())))["catalog"];
        } catch (error) {
            console.error(error.message);
        }
        return catalog;
    }

    async render() {
        let products = "";
        for (let product of this.catalog) {
            products +=
                `<product-details product-id="${product.id}" name="${product.name}" price="${product.price}"></product-details>`;
        }
        this.innerHTML =
            `<h2>Catalog</h2>
             <div class="products">${products}</div>`;
    }
}

customElements.define("product-catalog", ProductCatalog);

class ProductDetails extends HTMLElement {
    connectedCallback() {
        this.productId = this.getAttribute("product-id");
        this.name = this.getAttribute("name");
        this.price = Number(this.getAttribute("price"))
        this.render();
        this.registerHandlers();
    }

    render() {
        this.innerHTML =
            `<div class="product">
                <div class="name">${this.name}</div>
                <div class="price">${ShoppingCart.priceFormat.format(this.price)}</div>
                <div class="button">Add to cart</div>
            </div>`;
    }

    registerHandlers() {
        const button = this.querySelector(".button");
        button.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("addItemToCart", { detail: this }));
        });
    }
}

customElements.define("product-details", ProductDetails);

window.addEventListener("load", async () => {

    let shoppingCart = document.querySelector("shopping-cart");

    document.querySelectorAll("product-details").forEach(button => {
        button.addEventListener("addItemToCart", (event) => {
            shoppingCart.addItemToCart(event.detail);
        });
    });
});
