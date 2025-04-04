import { createProduct } from "./types/product.js";

const getProducts = async () => {
  try {
    let products = [];
    const token = document.cookie.split(";")[0].split("=")[1];
    const rep = await fetch("http://localhost:3009/products/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!rep.ok) window.location.replace("http://127.0.0.1:5500/front/components/login-form.html");

    let json = await rep.json();
    console.log(json);
    json.forEach((productData) => {
      let product = createProduct(productData.id, productData.title, productData.desc, productData.price, productData.category);
      if (productData?.images?.length > 0) productData.images.forEach((image) => product.addImage(image));
      products.push(product);
    });
    console.log(products);
    return products;
  } catch (err) {
    console.log(err);
  }
};

const allProducts = await getProducts();

const displayProducts = () => {
  allProducts.forEach((product) => product.displayProduct());
};

displayProducts();
