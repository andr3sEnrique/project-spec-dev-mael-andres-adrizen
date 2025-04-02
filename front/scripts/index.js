import { createBasket } from "./types/basket.js";
import { createProduct } from "./types/product.js";
import { createUser } from "./types/user.js";

const PORT_BACK = 1234;

const getProducts = async () => {
  const products = await fecth(`http://localhost:${PORT_BACK}/products/`).then((data) => {
    let json = JSON.parse(data);
    json.forEach((productData) => {
      let product = createProduct(productData.id, productData.title, productData.desc, productData.price, productData.category);
      productData.images.forEach((image) => product.addImage(image));
      products.push(product);
    });
  });
  return products;
};

const displayProducts = () => {
  const products = getProducts();
  products.forEach((product) => product.displayProduct());
};

const user = createUser(1, "user1", "user1");
console.log(user);
const basket = createBasket(1);
console.log(basket);

displayProducts();
