class CartState {
    static priceFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    constructor() {
        this.itemsCount = 0;
        this.totalAmount = 0;
    }

    addItemToCart(price) {
        this.totalAmount += price;
        this.itemsCount++;
        this.render();
    }

    render() {
        document.getElementById("cart").innerHTML =
            `${this.itemsCount} item(s) for a total amount of ${CartState.priceFormat.format(this.totalAmount)}.`;
    }
}


window.addEventListener("load", async () => {
    let cartState = new CartState();
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
                <div class="price">${CartState.priceFormat.format(product.price)}</div>
                <div class="button" id="button-${product.id}">Add to cart</div>
            </div>`;
    }

    document.querySelectorAll(".product .button").forEach(button => {
        button.addEventListener("click", () => {
            cartState.addItemToCart(parseFloat(button.parentElement.getAttribute("price")));
        });
    });
    cartState.render();
});
