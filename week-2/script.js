const products=[
{name:"Essential Cotton Tee",category:"T-Shirts",gender:"Men",colour:"White",sizes:["S","M","L","XL"],price:799,available:true,img:"assets/tee.svg",desc:"A simple everyday cotton T-shirt designed for comfortable casual wear."},
{name:"Classic Black Tee",category:"T-Shirts",gender:"Men",colour:"Black",sizes:["S","M","L"],price:899,available:true,img:"assets/black-tee.svg",desc:"A versatile black T-shirt for everyday styling."},
{name:"Relaxed Blue Jeans",category:"Jeans",gender:"Men",colour:"Blue",sizes:["M","L","XL"],price:1799,available:true,img:"assets/jeans.svg",desc:"Relaxed-fit denim designed for everyday comfort."},
{name:"Beige Overshirt",category:"Shirts",gender:"Women",colour:"Beige",sizes:["S","M","L"],price:1499,available:true,img:"assets/overshirt.svg",desc:"A clean neutral overshirt that works across casual outfits."},
{name:"Everyday White Shirt",category:"Shirts",gender:"Women",colour:"White",sizes:["S","M","L","XL"],price:1299,available:true,img:"assets/white-shirt.svg",desc:"A lightweight everyday shirt with a simple silhouette."},
{name:"Indigo Denim",category:"Jeans",gender:"Women",colour:"Blue",sizes:["S","M","L"],price:1899,available:true,img:"assets/indigo.svg",desc:"Classic indigo denim with a comfortable everyday fit."},
{name:"Black Casual Shirt",category:"Shirts",gender:"Men",colour:"Black",sizes:["M","L","XL"],price:1399,available:true,img:"assets/black-shirt.svg",desc:"A smart-casual black shirt for versatile styling."},
{name:"Soft Beige Tee",category:"T-Shirts",gender:"Women",colour:"Beige",sizes:["S","M","L"],price:849,available:false,img:"assets/beige-tee.svg",desc:"A soft neutral T-shirt. Currently unavailable in the prototype catalogue."}
];

let current=null, bag=[];
const grid=document.getElementById("productsGrid");
function render(){
 let q=document.getElementById("search").value.toLowerCase(), cat=document.getElementById("categoryFilter").value, col=document.getElementById("colourFilter").value, size=document.getElementById("sizeFilter").value, sort=document.getElementById("sort").value;
 let list=products.filter(p=>(!q||p.name.toLowerCase().includes(q))&&(cat==="All"||p.category===cat||p.gender===cat)&&(col==="All"||p.colour===col)&&(size==="All"||p.sizes.includes(size)));
 if(sort==="low")list.sort((a,b)=>a.price-b.price); if(sort==="high")list.sort((a,b)=>b.price-a.price);
 grid.innerHTML=list.map((p,i)=>`<article class="product"><img src="${p.img}" alt="${p.name}"><div class="product-info"><p class="meta">${p.category} • ${p.colour}</p><h3>${p.name}</h3><p class="price">₹${p.price}</p><p class="meta">${p.available?"Available":"Currently unavailable"} • Sizes ${p.sizes.join(", ")}</p><button class="view" onclick="openProduct(${products.indexOf(p)})">View Details</button></div></article>`).join("")||"<p>No matching products found.</p>";
}
function openProduct(i){
 current=products[i]; document.getElementById("modalImage").src=current.img; document.getElementById("modalImage").alt=current.name;
 document.getElementById("modalCategory").textContent=current.category+" • "+current.gender;
 document.getElementById("modalName").textContent=current.name; document.getElementById("modalPrice").textContent="₹"+current.price;
 document.getElementById("modalDescription").textContent=current.desc; document.getElementById("modalColour").textContent=current.colour;
 document.getElementById("modalAvailability").textContent=current.available?"Available":"Currently unavailable";
 document.getElementById("modalSize").innerHTML=current.sizes.map(s=>`<option>${s}</option>`).join("");
 document.getElementById("productModal").classList.add("open");
}
document.getElementById("closeModal").onclick=()=>document.getElementById("productModal").classList.remove("open");
document.getElementById("addToBag").onclick=()=>{if(!current.available)return alert("This product is currently unavailable.");bag.push({...current,size:document.getElementById("modalSize").value});updateCart();document.getElementById("productModal").classList.remove("open");openCart()};
function updateCart(){document.getElementById("bagCount").textContent=bag.length;document.getElementById("cartItems").innerHTML=bag.length?bag.map((p,i)=>`<div class="cart-item"><img src="${p.img}"><div><strong>${p.name}</strong><p>Size: ${p.size}</p><b>₹${p.price}</b><button onclick="removeItem(${i})"> Remove</button></div></div>`).join(""):"<p>Your bag is empty.</p>";document.getElementById("subtotal").textContent=bag.reduce((s,p)=>s+p.price,0)}
function removeItem(i){bag.splice(i,1);updateCart()}
function openCart(){document.getElementById("cart").classList.add("open");document.getElementById("overlay").classList.add("open")}
function closeCart(){document.getElementById("cart").classList.remove("open");document.getElementById("overlay").classList.remove("open")}
document.getElementById("bagBtn").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;document.getElementById("overlay").onclick=closeCart;
document.getElementById("menuBtn").onclick=()=>document.getElementById("nav").classList.toggle("show");
["search","categoryFilter","colourFilter","sizeFilter","sort"].forEach(id=>document.getElementById(id).addEventListener("input",render));
document.querySelectorAll(".cat-card").forEach(b=>b.onclick=()=>{document.getElementById("categoryFilter").value=b.dataset.category;document.getElementById("products").scrollIntoView();render()});
render();updateCart();