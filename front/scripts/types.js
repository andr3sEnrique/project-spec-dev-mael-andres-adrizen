function Product(id, libelle, desc, price, category) {
  const isvalidCategory = (category) => Object.values(Category).includes(category);

  this.id = id;
  this.libelle = libelle;
  this.desc = desc;
  this.price = price;
  if (!isvalidCategory(category)) throw new Error("The product category is invalid");
  this.category = category;
}

const createProduct = (id, libelle, desc, price, category) => {
  const product = new Product(id, libelle, desc, price, category);

  Object.defineProperty(product, "images", {
    writable: false,
    enumerable: true,
    value: [],
  });

  Object.defineProperty(product, "addImage", {
    value: (img) => product.images.push(img),
  });

  Object.defineProperty(product, "displayProduct", {
    value: () => {
      console.log("Entré dans la fonction");
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML += `
        <div class="product-header">
          <h3>Product :  ${product.libelle}</h3>
          <h4>${product.category}</h4>
        </div>
        <p>${product.desc}</p>
        <p>Price : ${product.price}€</p>
      `;
      document.body.appendChild(productDiv);
    },
  });

  return product;
};

const Category = {
  FOOD: "food",
  FURNITURE: "furniture",
  SPORT: "sport",
};
Object.freeze(Category);

export { createProduct, Category };
