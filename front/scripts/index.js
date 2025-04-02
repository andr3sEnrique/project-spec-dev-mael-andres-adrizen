import { createBasket } from "./types/basket.js";
import { createProduct } from "./types/product.js";
import { createUser } from "./types/user.js";

const dataDuBack = [
  { id: 1, title: "Produit1", desc: "Le premier produit", price: 10, category: "food", images: ["url1", "url2"] },
  { id: 1, title: "Produit2", desc: "Le deuxième produit", price: 10, category: "furniture", images: ["url1", "url2"] },
  { id: 1, title: "Produit3", desc: "Le troisième produit", price: 10, category: "sport", images: ["url1", "url2"] },
];

const getProducts = () => {
  let products = new Array();
  dataDuBack.forEach((productData) => {
    let product = createProduct(productData.id, productData.title, productData.desc, productData.price, productData.category);
    productData.images.forEach((image) => product.addImage(image));
    products.push(product);
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
