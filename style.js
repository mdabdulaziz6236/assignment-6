// console.log("Alhamdulillah for everything.");

// Containers
const plantContainer = document.getElementById("plant-container");
const categoryContainer = document.getElementById("category-container");
const spinner = document.getElementById("spinner");

// Modal
const modal = document.getElementById("plantModal");
const modalImg = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalCat = document.getElementById("modalCategory");
const modalDesc = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
document
  .getElementById("closeModal")
  .addEventListener("click", () => modal.close());

// Data
let plantsList = [];

// Spinner
const showLoading = () => spinner.classList.remove("hidden");
const hideLoading = () => spinner.classList.add("hidden");

// Update Cart Total
function updateCartTotal() {
  let total = 0;
  document.querySelectorAll(".cart-item .price").forEach((p) => {
    total += Number(p.textContent);
  });
  document.getElementById("total-amount").textContent = total;
}

// Show Plants
function showPlants(plants) {
  plantContainer.innerHTML = "";

  plants.forEach((plant) => {
    const card = document.createElement("div");
    card.innerHTML = `
  <div class="shadow bg-white rounded-xl flex flex-col mb-7 transform transition-transform duration-300 hover:scale-105">
    <img src="${plant.image}" alt="${plant.name}" class="rounded-t-xl h-44 w-full object-cover">
    <div class="p-3">
      <h3 class="font-semibold text-[23px] mb-2 cursor-pointer hover:text-green-700">${plant.name}</h3>
      <p class="card-desc mb-2 text-gray-700 line-clamp-2">${plant.description}</p>
      <div class="flex justify-between items-center mb-2">
        <p class="text-[#15803d] text-[16px] font-medium bg-green-300 px-4 py-2 rounded-full mb-2">${plant.category}</p>
        <p class="font-bold text-[20px] text-[#15803d]">৳ <span>${plant.price}</span></p>
      </div>
      <button class="w-full px-4 py-2 rounded-full font-medium text-white bg-[#15803d] hover:bg-green-950 transition-colors duration-300">
        Add to Cart
      </button>
      </div>
    </div>
    `;

    // Add to Cart
    const cartContainer = document.getElementById("count-container");
    card.querySelector("button").addEventListener("click", () => {
      alert(`${plant.name} added to cart.`);

      const cartItem = document.createElement("div");
      cartItem.innerHTML = `
        <div class="cart-item flex justify-between items-center bg-green-500 rounded-xl p-3 mb-3">
          <div class="mr-40 md:mr-0">
            <h3 class="font-semibold text-[18px] mb-1">${plant.name}</h3>
            <p>৳ <span class="price font-bold">${plant.price}</span></p>
          </div>
          <p class="clear-btn cursor-pointer text-red-500"><i class="fa-solid fa-xmark"></i></p>
        </div> `;

      cartContainer.appendChild(cartItem);
      updateCartTotal();

      cartItem.querySelector(".clear-btn").addEventListener("click", () => {
        cartItem.remove();
        updateCartTotal();
      });
    });

    // Modal
    card.querySelector("h3").addEventListener("click", () => {
      modalImg.src = plant.image;
      modalName.textContent = plant.name;
      modalCat.textContent = plant.category;
      modalDesc.textContent = plant.description;
      modalPrice.textContent = plant.price;
      modal.showModal();
    });

    plantContainer.appendChild(card);
  });
}

// Highlight Category
function highlightCategory(selected) {
  categoryContainer.querySelectorAll(".category-btn").forEach((btn) => {
    btn.classList.remove("bg-[green]", "text-white");
    btn.classList.add("hover:bg-[green]", "hover:text-white");
  });
  selected.classList.add("bg-[green]", "text-white");
  selected.classList.remove("hover:bg-[green]", "hover:text-white");
}

// Load Data
async function loadData() {
  showLoading();

  const plantsRes = await fetch(
    "https://openapi.programming-hero.com/api/plants"
  );
  const plantsData = await plantsRes.json();
  plantsList = plantsData.plants;

  const categoriesRes = await fetch(
    "https://openapi.programming-hero.com/api/categories"
  );
  const categoriesData = await categoriesRes.json();

  categoryContainer.innerHTML = "";

  // All Trees Button
  const allBtn = document.createElement("div");
  allBtn.innerHTML = `
    <div class="mb-1 rounded-[5px] category-btn bg-[green] text-white cursor-pointer transition">
      <h1 class="font-medium text-[18px] p-[10px]">All Trees</h1>
    </div>
  `;
  allBtn.addEventListener("click", () => {
    showPlants(plantsList);
    highlightCategory(allBtn.firstElementChild);
  });
  categoryContainer.appendChild(allBtn);

  // Category Buttons
  categoriesData.categories.forEach((cat) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="mb-1 rounded-[5px] category-btn hover:bg-[green] hover:text-white cursor-pointer transition">
        <h1 class="font-medium text-[18px] p-[10px]">${cat.category_name}</h1>
      </div>
    `;

    const innerDiv = div.firstElementChild;
    innerDiv.addEventListener("click", () => {
      const filtered = plantsList.filter(
        (p) =>
          p.category?.trim().toLowerCase() ===
          cat.category_name.trim().toLowerCase()
      );
      showPlants(filtered);
      highlightCategory(innerDiv);
    });

    categoryContainer.appendChild(div);
  });

  showPlants(plantsList);
  hideLoading();
}

loadData();

