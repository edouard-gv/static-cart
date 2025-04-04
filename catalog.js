import { priceFormat, mapConcatMap } from "./formaters.js";

export class ProductCatalog {
    async fetchCatalog() {
        let catalog = {};
        const response = await fetch("catalog-data.json");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        (JSON.parse(await response.text()))["catalog"]
            .forEach(product => catalog[product.id] = product)
        return catalog;
    }

    async render() {
        this.catalog = await this.fetchCatalog();

        document.querySelector(".catalog").innerHTML =
            `<h2>Catalog</h2>
             <ul class="products">${mapConcatMap(this.catalog, product =>
                `<li class="product">
                    <div class="designation">${product.designation}</div>
                    <div class="price">${priceFormat.format(product.price)}</div>
                    <div class="button" product-id="${product.id}" designation="${product.designation}" price="${product.price}">Add to cart</div>
                </li>`)}
            </ul>`;
    }

    registerHandlers() {
        const buttons = document.querySelector(".catalog").querySelectorAll(".button");
        buttons.forEach(button => {
            const product = { id: button.getAttribute("product-id"), designation: button.getAttribute("designation"), price: Number(button.getAttribute("price")) };
            button.addEventListener("click", () => {
                document.dispatchEvent(new CustomEvent("addItemToCart", { detail: product }));
            });
        });
    }
}