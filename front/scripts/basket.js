import { createBasket } from "./types/basket.js";

const dataDuBack = [
  { id: 1, title: "Produit1", desc: "Le premier produit", price: 10, category: "food", images: ["url1", "url2"] },
  { id: 1, title: "Produit2", desc: "Le deuxième produit", price: 10, category: "furniture", images: ["url1", "url2"] },
  { id: 1, title: "Produit3", desc: "Le troisième produit", price: 10, category: "sport", images: ["url1", "url2"] },
];

const basket = createBasket(1);
dataDuBack.forEach((product) => {
  basket.addProduct(product);
});
basket.displayBasket();
