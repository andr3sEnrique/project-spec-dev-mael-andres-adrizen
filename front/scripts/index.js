import { createProduct, Category } from "./types.js";

const dataDuBack = [
  { id: 1, libelle: "Produit1", desc: "Le premier produit", price: 10, category: "food", images: ["url1", "url2"] },
  { id: 1, libelle: "Produit2", desc: "Le deuxième produit", price: 10, category: "furniture", images: ["url1", "url2"] },
  { id: 1, libelle: "Produit3", desc: "Le troisième produit", price: 10, category: "sport", images: ["url1", "url2"] },
];

const getProducts = () => {
  let products = new Array();
  dataDuBack.forEach((productData) => {
    let product = createProduct(productData.id, productData.libelle, productData.desc, productData.price, productData.category);
    productData.images.forEach((image) => product.addImage(image));
    products.push(product);
  });
  return products;
};

const displayProducts = () => {
  const products = getProducts();
  products.forEach((product) => product.displayProduct());
};

displayProducts();
