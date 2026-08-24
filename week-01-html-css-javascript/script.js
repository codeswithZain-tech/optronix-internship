let allproducts=[];
let cart=[];
async function getProducts(){
    try{
        const rep=await fetch("https://fakestoreapi.com/products");
        const data=await rep.json();
        allproducts=data.slice(0,20);
        displayProducts(allproducts);
    }
    catch(error){
        document.getElementById("products").innerHTML=
        '<h2>Failed to Fetch</h2>'
    }
}
function displayProducts(list){
    let output="";
    list.forEach(product => {
        output+=`
        <div class="card">
        <img src="${product.image}">
        <h3>${product.title}</h3>
        <p><b>Category:</b> ${product.category}</p>
        <p><b>Price:</b> $${product.price}</p>
        <button onclick="addToCart(${product.id})">
        Add To Cart
        </button>
        </div>
        `;
    });
    document.getElementById("products").innerHTML=output;
}

function filterProducts(category){
    if(category=="all"){
        displayProducts(allproducts);
    }
    else{
        let filtered = allproducts.filter(product=>product.category==category);
        displayProducts(filtered);
    }
}
function addToCart(id){
    let product = allproducts.find(product=>product.id==id);
    cart.push(product);
    document.getElementById("cartcount").innerHTML = cart.length;
}
getProducts();