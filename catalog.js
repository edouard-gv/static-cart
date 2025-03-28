import { priceFormat, mapConcatArray } from "./formaters.js";

export class ProductCatalog {
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
        this.catalog = await this.fetchCatalog();

        document.querySelector(".catalog").innerHTML =
            `<h2>Catalog</h2>
             <div class="products">${mapConcatArray(this.catalog, product =>
                `<div class="product">
                    <div class="name">${product.name}</div>
                    <div class="price">${priceFormat.format(product.price)}</div>
                    <div class="button" product-id="${product.id}" name="${product.name}" price="${product.price}">Add to cart</div>
                </div>`)}
            </div>`;
    }

    registerHandlers() {
        const buttons = document.querySelector(".catalog").querySelectorAll(".button");
        buttons.forEach(button => {
            const product = { id: button.getAttribute("product-id"), name: button.getAttribute("name"), price: Number(button.getAttribute("price")) };
            button.addEventListener("click", () => {
                document.dispatchEvent(new CustomEvent("addItemToCart", { detail: product }));
            });
        });
    }
}