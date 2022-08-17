let p = ` <nav aria-label="Category Pagination">
<ul class="pagination justify-content-end">
   <li class="page-item page-prev">
      <a class="page-link page-prev" href="#" tabindex="-1">Previous</a>
   </li>
   <li class="page-item"><a class="page-link pageIndex" id="pageIndex" href="#">1</a></li>
   <!-- <li class="page-item"><a class="page-link" href="#">2</a></li> -->
   <li class="page-item">
      <a class="page-link page-next" href="#">Next</a>
   </li>
</ul>
</nav>`;

const images = ["images/ring.jpg", "images/beimg2.png", "images/beimg3.png"];
const slid = document.querySelector(".slider_section");
let sectionCenter = document.querySelector(".section-center");
let sectionModal = document.querySelector(".modal-container");
let change = document.querySelector(".change");
const filterBtns = document.querySelectorAll(".text-center");
let pa = document.querySelector(".page");
let ind = 1;

function Paginator(items, page, per_page) {
  var page = page || 1,
    per_page = per_page || 10,
    offset = (page - 1) * per_page,
    paginatedItems = items.slice(offset).slice(0, per_page),
    total_pages = Math.ceil(items.length / per_page);
  return {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: total_pages > page ? page + 1 : null,
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems,
  };
}

// console.log(ring);
const pagechange = (ProductList) => {
  displayItems(ProductList);
  // console.log(ProductList);
//   pa.innerHTML = p;
  mod(ProductList);
  const pindex = document.querySelector(".pageIndex");
  const leftNav = document.querySelector(".page-prev");
  leftNav.addEventListener("click", () => {
    if (ind > 0) {
      ind--;
    }
    // console.log(ind);
    sectionCenter.innerHTML = "";
    displayItems(Paginator(ProductList, ind, 9).data);
    mod(ProductList);
    pindex.textContent = ind;
  });
  const rightNav = document.querySelector(".page-next");
  rightNav.addEventListener("click", () => {
    ind++;
    // console.log(ind);
    sectionCenter.innerHTML = "";
    displayItems(Paginator(ProductList, ind, 9).data);
    mod(ProductList);
    pindex.textContent = ind;
  });
};

const displayItems = (ProductListItems) => {
  let displayProductList = ProductListItems.map((item) => {
    let htmlSource = `
    <img src="" alt="Denim Jeans" style="width:100%">
    
    <h1 class='cat'></h1>
    <p class="price"></p>
    <p class='desc'></p>
    <a href="#">
    <i class="fa fa-whatsapp" style="font-size:48px;color:green"></i>
    </a>
    
  `;

    const card = document.createElement("div");
    card.id = item.id;
    card.classList.add("card");
    card.innerHTML = htmlSource;
    card.querySelector(".price").textContent = `Average Weight: ${item.weight}`;
    card.querySelector("img").src = item.images[0];
    card.querySelector(".cat").textContent = item.category;
    card.querySelector(".desc").textContent = item.description;

    return card;
  });
  displayProductList.forEach((element) => {
    sectionCenter.appendChild(element);
  });
};
const displayProduct = (ProductList) => {
  const pd = document.querySelectorAll(".product");
  pd.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      // console.log(btn.querySelector(".pname").textContent);
      const ProductListCategory = ProductList.filter(function (
        ProductListItems
      ) {
        // console.log(ProductListItems.category);
        if (
          btn.querySelector(".pname").textContent === ProductListItems.category
        ) {
          return ProductListItems;
        }
      });
      change.innerHTML = "";
      slid.innerHTML = "";
      // console.log(ind);
      // console.log(Paginator(ProductListCategory, ind, 9).data);
      pagechange(Paginator(ProductListCategory, ind, 9).data);
    });
  });
};

let i = 0;
let f = 0;
const mod = (ProductList) => {
  const modalOverlay = document.querySelector(".modal-overlay");
  const closeBtn = document.querySelector(".close-btn");
  const card = sectionCenter.querySelectorAll(".card");

  // console.log(card);
  if (card && f === 0) {
    card.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        let id = btn.id;
        // console.log(id);
        modalOverlay.classList.add("open-modal");
        closeBtn.classList.add("open-modal");
        // console.log(ProductList);
        const x = ProductList.filter((item) => item.id === id);
        //console.log(typeof x);
        // console.log(x);
        f = 1;
        displayItemsModal(x);
        mod();
      });
      closeBtn.addEventListener("click", function () {
        modalOverlay.classList.remove("open-modal");
        closeBtn.classList.remove("open-modal");
        sectionModal.innerHTML = "";
        f = 0;
      });
    });
  }
};

const displayItemsModal = (it) => {
  //console.log(it[0].images);
  const item = it[0];
  let htmlSource = `
  <img src="" alt="image" style="width:70% ">
  <a class="prev" onclick="">&#10094;</a>
<a class="next" >&#10095;</a>
<div class="content">
  <h1 class='cat'></h1>
  <p class='desc'></p>
  <p class="price"></p>  
  <p class='design'></p>
  <p class='mtype'></p>
  <p class='mqual'></p>
  <p class='gender'></p>
  <p class='ref'></p>
  <a href="#">
  <i class="fa fa-whatsapp" style="font-size:48px;color:green"></i>
  </a>
  </div>
  `;
  const modal = document.createElement("div");
  modal.id = item.id;
  modal.classList.add("modal-container");
  modal.innerHTML = htmlSource;

  modal.querySelector("img").src = item.images[0];
  modal.querySelector(".desc").textContent = item.description;
  modal.querySelector(".mtype").textContent = `Design Type: ${item.metalType}`;
  modal.querySelector(".price").textContent = `Average Weight: ${item.weight}`;
  modal.querySelector(
    ".mqual"
  ).textContent = `Quality Type: ${item.metalQualityType}`;
  modal.querySelector(".gender").textContent = `For ${item.personFor}`;

  const leftNav = modal.querySelector(".prev");
  let i = 0;
  leftNav.addEventListener("click", () => {
    const len = item.images.length;
    i = (i - 1 + len) % len;
    modal.querySelector("img").src = item.images[i];
    // console.log(i);
  });
  const rightNav = modal.querySelector(".next");
  rightNav.addEventListener("click", () => {
    const len = item.images.length;
    i = (i + 1) % len;
    modal.querySelector("img").src = item.images[i];
  });
  sectionModal.appendChild(modal);
};

var ProductList = [];
const http = new XMLHttpRequest();
http.addEventListener("readystatechange", function () {
  if (this.readyState == 4) {
    ProductList = JSON.parse(http.responseText).data;
  }
});
http.open("GET", "https://khatri-alankar.herokuapp.com/api/products/get");
http.send();

http.onload = () => {
  ProductList = JSON.parse(http.responseText).data;
  pagechange(Paginator(ProductList, ind, 9).data);
};
