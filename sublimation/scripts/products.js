const productList = document.getElementById("product-list");
const modal = document.getElementById("product-modal");
const modalDetails = document.getElementById("modal-details");
const closeModal = document.getElementById("close-modal");

async function loadProducts() {
  try {
    const res = await fetch("data/products.json");
    const data = await res.json();

    data.forEach((product) => {
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
        const product = data.find(p => p.id == id);
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
  } catch (err) {
    console.error("Error loading products:", err);
  }
}

closeModal.addEventListener("click", () => modal.close());

loadProducts();