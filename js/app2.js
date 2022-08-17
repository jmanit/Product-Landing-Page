//import { displayItems } from "./app";
const menu = [
    {
      id: "PRD-811609",
      category: "RING",
      description: "RING 1",
      images: ["images/ring.jpg", "images/beimg2.png", "images/beimg3.png"],
    },
    {
      id: "PRD-729358",
      category: "RING",
      description: "RING 1",
      designTypeName: "banarasi",
      metalType: "GOLD",
      metalQualityType: "MQ_916",
      personFor: "BOTH",
      referenceName: "Arvind Jewellers",
      images: ["images/ring.jpg", "images/beimg2.png", "images/beimg3.png"],
    },
  ];
const filterBtns = document.querySelectorAll(".text-center");
const cat=document.getElementById("ring");
let sectionCenter=document.querySelector(".change");
console.log(sectionCenter);
//console.log(cat);
if(cat){
cat.addEventListener('click',function(){
    const menuCategory = menu.filter(function (menuItems) {
      // alert("RING" == menuItems.category);
        if ("RING" == menuItems.category) {
          return menuItems;
        }
       
      });
      displayItems(menuCategory);
     // window.
});
}
const displayItems = (menuItems) => {

    let displayMenu = menuItems.map((item) => {
  
      let htmlSource = `
      <img src="" alt="Denim Jeans" style="width:100%">
      <a class="prev" onclick="">&#10094;</a>
    <a class="next" >&#10095;</a>
      <h1 class='cat'></h1>
      <p class="price">$19.99</p>
      <p class='desc'></p>
      <p><button>Add to Cart</button></p>
    `;
  
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = htmlSource;
  
    card.querySelector('img').src = item.images[0];
    card.querySelector('.cat').textContent = item.category;
    card.querySelector('.desc').textContent = item.description;
    
    const leftNav = card.querySelector('.prev');
    let i  = 0;
    leftNav.addEventListener('click', () => {
      const len = item.images.length;
      i=(i-1+len)%len;
      card.querySelector('img').src = item.images[i];
     // console.log(i);
    });
    const rightNav = card.querySelector('.next');
    rightNav.addEventListener('click', () => {
      const len = item.images.length;
      i=(i+1)%len;
      card.querySelector('img').src = item.images[i];
     // console.log(i);
    });
    return card;
    });
    sectionCenter="";
    displayMenu.forEach(element => {
      sectionCenter.appendChild(element);
    });
  };
//filter items
/*filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const category = e.currentTarget.dataset.id;
    const menuCategory = menu.filter(function (menuItems) {
      if (category === menuItems.category) {
        return menuItems;
      }

    });
    if (category == "all") {
      displayItems(menu);
    } else {
      displayItems(menuCategory);
    }
  });
});*/
//console.log(menu[0].image[0].length());
export {cat};
