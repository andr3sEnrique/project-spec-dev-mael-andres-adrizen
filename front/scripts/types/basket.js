import { Product } from "./product";
import { User } from "./user";

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
};

export { createBasket };
