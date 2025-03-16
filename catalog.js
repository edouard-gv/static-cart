export let priceFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

class ProductCatalog extends HTMLElement {
    async connectedCallback() {
        this.catalog = await this.fetchCatalog();
        this.render();
    }

    async fetchCatalog() {
        let catalog = [];
        try {
            const response = await fetch("catalog-data.json");
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
                <div class="price">${priceFormat.format(this.price)}</div>
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