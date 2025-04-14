const productList = document.getElementById("product-list");
const modal = document.getElementById("product-modal");
const modalDetails = document.getElementById("modal-details");
const closeModal = document.getElementById("close-modal");

let allProducts = [];

async function loadProducts() {
  try {
    const res = await fetch("data/products.json");
    const data = await res.json();
    allProducts = data;
    displayProducts(data);

    // Filter buttons
    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelector(".filter-btn.active")?.classList.remove("active");
        btn.classList.add("active");
        const category = btn.dataset.category;
        if (category === "all") {
          displayProducts(allProducts);
        } else {
          const filtered = allProducts.filter(p => p.category === category);
          displayProducts(filtered);
        }
      });
    });
  } catch (err) {
    console.error("Error loading products:", err);
  }
}

function displayProducts(products) {
  productList.innerHTML = "";
  products.forEach((product) => {
    const item = document.createElement("article");
    item.innerHTML = `
      <h3>${product.name}</h3>
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <p>${product.description}</p>
      <p><strong>Price:</strong> $${product.price}</p>
      <button data-id="${product.id}" class="view-btn">View More</button>
    `;
    productList.appendChild(item);
  });

  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const product = allProducts.find(p => p.id == id);
      modalDetails.innerHTML = `
        <h3>${product.name}</h3>
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <p>${product.description}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Price:</strong> $${product.price}</p>
      `;
      modal.showModal();
    });
  });
}

closeModal.addEventListener("click", () => modal.close());

loadProducts();
