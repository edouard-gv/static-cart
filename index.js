class ShoppingCart extends HTMLElement {
    static priceFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    connectedCallback() {
        this.itemsCount = 0;
        this.totalAmount = 0;
        this.render();
    }

    addItemToCart(price) {
        this.totalAmount += price;
        this.itemsCount++;
        this.render();
    }

    render() {
        this.innerHTML =
            `<h2>Shopping Cart</h2>
             <div class="cart">
             ${this.itemsCount} item(s) for a total amount of ${ShoppingCart.priceFormat.format(this.totalAmount)}.
             </div>`;
    }
}

customElements.define("shopping-cart", ShoppingCart);

class ProductCatalog extends HTMLElement {
    async connectedCallback() {
        this.render();
    }

    async render() {
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

        let products = "";

        for (let product of catalog) {
            products +=
                `<product-details id="product-${product.id}" name="${product.name}" price="${product.price}"></product-details>`;
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
            this.dispatchEvent(new CustomEvent("addItemToCart", { detail: { price: this.price } }));
        });
    }
}

customElements.define("product-details", ProductDetails);

window.addEventListener("load", async () => {

    let shoppingCart = document.querySelector("shopping-cart");

    document.querySelectorAll("product-details").forEach(button => {
        button.addEventListener("addItemToCart", (event) => {
            shoppingCart.addItemToCart(parseFloat(event.detail.price));
        });
    });
});
