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
            `${this.itemsCount} item(s) for a total amount of ${ShoppingCart.priceFormat.format(this.totalAmount)}.`;
    }
}

customElements.define("shopping-cart", ShoppingCart);

window.addEventListener("load", async () => {
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

    for (let product of catalog) {
        document.getElementById("catalog").innerHTML +=
            `<div class="product" id="product-${product.id}" name="${product.name}" price="${product.price}">
                <div class="name">${product.name}</div>
                <div class="price">${ShoppingCart.priceFormat.format(product.price)}</div>
                <div class="button" id="button-${product.id}">Add to cart</div>
            </div>`;
    }

    let shoppingCart = document.querySelector("shopping-cart");

    document.querySelectorAll(".product .button").forEach(button => {
        button.addEventListener("click", () => {
            shoppingCart.addItemToCart(parseFloat(button.parentElement.getAttribute("price")));
        });
    });
});
