import { createBasket } from "./types/basket.js";
import { createProduct } from "./types/product.js";
import { createUser } from "./types/user.js";

const PORT_BACK = 3009;

const getProducts = async () => {
  const products = await fetch(`http://localhost:${PORT_BACK}/products/`).then((data) => {
    let json = JSON.parse(data);
    console.log(json);
    json.forEach((productData) => {
      let product = createProduct(productData.id, productData.title, productData.desc, productData.price, productData.category);
      productData.images.forEach((image) => product.addImage(image));
      products.push(product);
    });
  });
  return products;
};

const allProducts = getProducts();

const displayProducts = () => {
  allProducts.forEach((product) => product.displayProduct());
};

const addProduct = async () => {
  console.log("Entré dans la fonction add");
  await fetch(`http://loca`);
};

const addProductButton = document.getElementById("button-add-product");
addProductButton.addEventListener("click", addProduct);

const user = createUser(1, "user1", "user1");
console.log(user);
const basket = createBasket(1);
console.log(basket);

displayProducts();
