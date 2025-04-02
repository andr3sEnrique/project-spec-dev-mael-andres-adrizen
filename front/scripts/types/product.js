function Product(id, title, desc, price, category) {
  const isvalidCategory = (category) => Object.values(Category).includes(category);

  this.id = id;
  this.title = title;
  this.desc = desc;
  this.price = price;
  if (!isvalidCategory(category)) throw new Error("The product category is invalid");
  this.category = category;
}

const createProduct = (id, title, desc, price, category) => {
  const product = new Product(id, title, desc, price, category);

  Object.defineProperty(product, "images", { writable: false, enumerable: true, value: [] });

  Object.defineProperty(product, "addImage", { value: (img) => product.images.push(img) });

  Object.defineProperty(product, "displayProduct", {
    value: () => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML += `
        <div class="product-header">
          <h3>Product :  ${product.title}</h3>
          <h4>${product.category}</h4>
        </div>
        <p>${product.desc}</p>
        <p>Price : ${product.price}€</p>
        <div class="div-add">
          <button class="button-add">Add</button>
        </div>
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

export { Product, createProduct, Category };
