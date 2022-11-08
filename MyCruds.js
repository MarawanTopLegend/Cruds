let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let totalbutton = document.getElementById("totalbutton")
let count = document.getElementById("count")
let catagory = document.getElementById("catagory")
let create = document.getElementById("create")
let search = document.getElementById("search")
let searchbytitle = document.getElementById("searchbytitle")
let searchbycatagory = document.getElementById("searchbycatagory")
let deleteall = document.getElementById("deleteall")
let table = document.getElementById("table")
let deletebutton = document.getElementsByClassName("DeleteButton")
let mood = "Create"
let tmp;
let searchmood = "title"
// localStorage.clear()

function TheTotal(){
if(price.value != ""){
    let result = (+price.value + +ads.value + +taxes.value) - +discount.value;
    totalbutton.innerHTML = result
    totalbutton.style.background = "green"
}
else{
    totalbutton.innerHTML = "Total"
    totalbutton.style.background = "red"
}
};

let data;
if(localStorage.product != null){
    data = JSON.parse(localStorage.product)
}
else{
    data = [];
}
create.onclick = function(){
let product = {
    title:title.value,
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    count:count.value,
    catagory:catagory.value,
    total:totalbutton.innerHTML,
}

if(product.title != "" && product.price != "" && product.catagory != ""){
    if(mood === "Create"){
        if(count.value > 1){
            for( i = 0 ; i < count.value ; i++){
                data.push(product)
                localStorage.setItem("product" , JSON.stringify(data))
            }        
        }
        else{
            data.push(product)
            localStorage.setItem("product" , JSON.stringify(data))
        }  
        clear()  
        
    }
    else{
        if(data.length > 0 ){
            data[tmp] = product;
            count.style.display = "block"
            mood = "Create"
            create.innerText = "Create"
            clear()
            localStorage.product = JSON.stringify(data)
        }
        else{
            count.style.display = "block"
            mood = "Create"
            create.innerText = "Create"
            clear()
        }
    }
}
showdata()
TheTotal()
}

function clear(){
    title.value = ""
    price.value = ""
    taxes.value = ""
    ads.value = ""
    discount.value = ""
    count.value = ""
    catagory.value = ""
}
function showdata(){
    let table = "";
    for(i = 0 ; i < data.length ; i++){
        table +=`
        <tr> <td>${i}</td> <td>${data[i].title}</td> <td>${data[i].price}</td> <td>${data[i].taxes}</td> <td>${data[i].ads}</td> <td>${data[i].discount}</td> <td>${data[i].total}</td> <td>${data[i].catagory}</td> <td><button id="Update" onclick="update(${i})"> Update </button></td> <td><button id="DeleteButton" onclick="Delete('${i}')"> Delete </button></td> </tr> `;
    } 
    document.getElementById("tbody").innerHTML = table
    if(data.length > 0 ){
        document.getElementById("TheDeleteAllButton").innerHTML = `<button class="MainButtons" onclick="Deleteallevent()"> Delete All (${data.length}) </button>`
    }
    else{
        document.getElementById("TheDeleteAllButton").innerHTML = ""
    }
}
showdata()


function Delete( i ){
 data.splice(i , 1)
 localStorage.product = JSON.stringify(data);
 showdata()
}


function Deleteallevent(){
localStorage.clear()
data.splice(0)
showdata()
}

function update( i ){
title.value = data[i].title
price.value = data[i].price
taxes.value = data[i].taxes
ads.value = data[i].ads
discount.value = data[i].discount
catagory.value = data[i].catagory
create.innerText = "Update"
count.style.display = "none"
mood = "Update"
TheTotal()
tmp = i
}

function getsearchmood( v ){
if(v == "searchbytitle"){
    searchmood = "title"
}
else{
    searchmood = "catagory"
}
search.placeholder = "Search by " + searchmood
search.focus()
}
function searchdata(value){
    let table = ""
    if(searchmood == "title"){
        for(i = 0 ; i < data.length ; i++){
            if( data[i].title.includes(value)){
                table +=`
                <tr> <td>${i}</td> <td>${data[i].title}</td> <td>${data[i].price}</td> <td>${data[i].taxes}</td> <td>${data[i].ads}</td> <td>${data[i].discount}</td> <td>${data[i].total}</td> <td>${data[i].catagory}</td> <td><button id="Update" onclick="update(${i})"> Update </button></td> <td><button id="DeleteButton" onclick="Delete('${i}')"> Delete </button></td> </tr> `;
                document.getElementById("tbody").innerHTML = table
            }
        }
    }
    else{
        for(i = 0 ; i < data.length ; i++){
            if( data[i].catagory.includes(value)){
                table +=`
                <tr> <td>${i}</td> <td>${data[i].title}</td> <td>${data[i].price}</td> <td>${data[i].taxes}</td> <td>${data[i].ads}</td> <td>${data[i].discount}</td> <td>${data[i].total}</td> <td>${data[i].catagory}</td> <td><button id="Update" onclick="update(${i})"> Update </button></td> <td><button id="DeleteButton" onclick="Delete('${i}')"> Delete </button></td> </tr> `;
                document.getElementById("tbody").innerHTML = table
            }
        }
    }
}