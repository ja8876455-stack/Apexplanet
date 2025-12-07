/* ================= PRODUCT DATA ================== */
const products = [
  { name: "Smartphone", price: 15000, category: "electronics", img:"https://picsum.photos/400/300?1" },
  { name: "Headphone", price: 1200, category: "electronics", img:"https://picsum.photos/400/300?2" },
  { name: "T-shirt", price: 500, category: "fashion", img:"https://picsum.photos/400/300?3" },
  { name: "Jeans", price: 1200, category: "fashion", img:"https://picsum.photos/400/300?4" },
  { name: "Sofa", price: 15000, category: "home", img:"https://picsum.photos/400/300?5" },
  { name: "Mixer Grinder", price: 2500, category: "home", img:"https://picsum.photos/400/300?6" }
];

/* =============== RENDER PRODUCTS ================= */
const container = document.getElementById("productContainer");
let cartCount = 0;

function renderProducts(list) {
  container.innerHTML = "";

  list.forEach(p => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${p.img}" loading="lazy">

        <h3>${p.name}</h3>
        <p>Price: ₹${p.price}</p>
        <button class="btn" onclick="addToCart()">Add to Cart</button>
      </div>
    `;
  });
}

renderProducts(products);

/* =============== ADD TO CART ================= */
function addToCart() {
  cartCount++;
  document.getElementById("cartCount").textContent = cartCount;
}

/* =============== FILTER BY CATEGORY ================= */
document.getElementById("categoryFilter").onchange = () => {
  let value = categoryFilter.value;

  let filtered = products.filter(p =>
    value === "all" ? true : p.category === value
  );

  renderProducts(filtered);
};

/* =============== SORT BY PRICE ================= */
document.getElementById("sortPrice").onchange = () => {
  let value = sortPrice.value;
  let sorted = [...products];

  if (value === "low") sorted.sort((a,b)=> a.price - b.price);
  if (value === "high") sorted.sort((a,b)=> b.price - a.price);

  renderProducts(sorted);
};

/* =============== SEARCH BAR ================= */
document.getElementById("searchInput").oninput = () => {
  let text = searchInput.value.toLowerCase();

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(text)
  );

  renderProducts(filtered);
};
