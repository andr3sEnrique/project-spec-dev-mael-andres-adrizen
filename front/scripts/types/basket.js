import { Product } from "./product.js";
import { User } from "./user.js";

function Basket(id) {
  this.id = id;
}

const createBasket = (id) => {
  const basket = new Basket(id);

  Object.defineProperty(basket, "user", { writable: false, enumerable: true, value: "" });
  Object.defineProperty(basket, "products", { writable: false, value: [] });

  Object.defineProperty(basket, "setUser", {
    value: (user) => {
      if (!user instanceof User) throw new Error("The user is invalid");
      if (basket.user != "") throw new Error("This basket is already linked to another user");
      basket.user = user;
    },
  });

  Object.defineProperty(basket, "addProduct", {
    value: (product) => {
      if (!product instanceof Product) throw new Error("The product is invalid");
      basket.products.push(product);
    },
  });

  Object.defineProperty(basket, "displayBasket", {
    value: () => {
      basket.products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML += `
        <div class="product-header">
          <h3>Product :  ${product.title}</h3>
          <h4>${product.category}</h4>
        </div>
        <p>${product.desc}</p>
        <p>Price : ${product.price}€</p>
        <div class="div-remove">
          <button class="button-remove">Remove</button>
        </div>
      `;
        document.body.appendChild(productDiv);
      });
    },
  });

  return basket;
};

export { createBasket };
