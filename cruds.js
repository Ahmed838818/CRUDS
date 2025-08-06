let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ad = document.getElementById("ad");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let btn7 = document.getElementById('btn7');
let mood = "create"; // create or update

let inputs = document.querySelectorAll("input:not([type='submit']):not([type='button'])");

inputs.forEach((input, index) => {
    input.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let nextInput = inputs[index + 1];
            if (nextInput) {
                nextInput.focus();
            }
        }
    });
});
let tmp;

function gettotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ad.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "#040";
    } else {
        total.style.backgroundColor = "#a00d02";
    }
}

let datapro;
if (localStorage.getItem("product") != null) {
    datapro = JSON.parse(localStorage.getItem("product"));
} else {
    datapro = [];
}

//create product
submit.onclick = function () {
    let newpro = {
        title: title.value.trim().toLowerCase(),
        price: price.value.trim().toLowerCase(),
        taxes: taxes.value.trim().toLowerCase(),
        ad: ad.value.trim().toLowerCase(),
        discount: discount.value.trim().toLowerCase(),
        total: total.innerHTML.trim().toLowerCase(),
        count: count.value.trim().toLowerCase(),
        category: category.value.trim().toLowerCase()
    }
    if(title.value != '' && price.value != '' && newpro.count < 101 && newpro.count > 0 && category.value != '') {
  if (mood === "create") {
    if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
            datapro.push(newpro);
        }
    } else {
        datapro.push(newpro);
    }
   clearInputs(); }
} else {
    datapro[tmp] = newpro;
    mood = "create";
    submit.innerHTML = "Create";
    count.style.display = "block";
}
    //save local storage
  
    localStorage.setItem("product", JSON.stringify(datapro));
  
    total.style.backgroundColor = "#a00d02";
    showData();
};

//clear inputs
function clearInputs() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ad.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

//read
function showData() {
    gettotal();
    let table = '';
    for (let ww = 0; ww < datapro.length; ww++) {
        table += `
        <tr>
            <td>${ww + 1}</td>
            <td>${datapro[ww].title}</td>
            <td>${datapro[ww].price}</td>
            <td>${datapro[ww].taxes}</td>
            <td>${datapro[ww].ad}</td>
            <td>${datapro[ww].discount}</td>
            <td>${datapro[ww].total}</td>
            <td>${datapro[ww].category}</td>
            <td><button onclick="updateData(${ww})">update</button></td>
            <td><button onclick="deleteData(${ww})">delete</button></td>
        </tr>
        `;
    }
    document.getElementById("tbody").innerHTML = table;
    if (datapro.length > 0) {
        document.getElementById("deleteall").innerHTML = `<button onclick="deleteAll()">Delete All (${datapro.length})</button>`;
    }
    else {
        document.getElementById("deleteall").innerHTML = '';
    }
}

showData();
// count) 

//delete
function deleteData(ww) {
    datapro.splice(ww, 1);
    localStorage.setItem("product", JSON.stringify(datapro));
    showData();
}
function deleteAll() {
    localStorage.clear();
    datapro.splice(0);
    showData();
}

// update
function updateData(ww) {
    taxes.value = datapro[ww].taxes;
    ad.value = datapro[ww].ad;
    price.value = datapro[ww].price;
    title.value = datapro[ww].title;
    discount.value = datapro[ww].discount;
    gettotal();
    category.value = datapro[ww].category;
    count.style.display = "none";
    submit.innerHTML = "Update";
    mood = "update";
    tmp = ww;
    scroll({
        top: 0,
        behavior: "smooth"
    });
}

// search
 let searchmood ='title'
let search = document.getElementById("search");


function getsearchmood(id) {
 
    if (id === "searchtitle") {
        search.placeholder = "Search By Title";searchmood ='title'
    } else {
        search.placeholder = "Search By Category";searchmood ='category'
    }

    search.focus();
search.value = '';

showData();
}
function searchData(value) {
    let table = '';
   if(searchmood === 'title') {
for (let ww = 0; ww < datapro.length; ww++) {
        if (datapro[ww].title.includes(value.trim().toLowerCase())) {
            table += `
            <tr>
                <td>${ww + 1}</td>
                <td>${datapro[ww].title}</td>
                <td>${datapro[ww].price}</td>
                <td>${datapro[ww].taxes}</td>
                <td>${datapro[ww].ad}</td>
                <td>${datapro[ww].discount}</td>
                <td>${datapro[ww].total}</td>
                <td>${datapro[ww].category}</td>
                <td><button onclick="updateData(${ww})">update</button></td>
                <td><button onclick="deleteData(${ww})">delete</button></td>
            </tr>
            `;
        }
    }  } else {
for (let ww = 0; ww < datapro.length; ww++) {
        if (datapro[ww].category.includes(value.trim().toLowerCase())) {
            table += `
            <tr>
                <td>${ww + 1}</td>
                <td>${datapro[ww].title}</td>
                <td>${datapro[ww].price}</td>
                <td>${datapro[ww].taxes}</td>
                <td>${datapro[ww].ad}</td>
                <td>${datapro[ww].discount}</td>
                <td>${datapro[ww].total}</td>
                <td>${datapro[ww].category}</td>
                <td><button onclick="updateData(${ww})">update</button></td>
                <td><button onclick="deleteData(${ww})">delete</button></td>
            </tr>
            `;
        }
    }
}document.getElementById("tbody").innerHTML = table;}  
//clear search
//scrollBy(100,300)//
let scroll = document.getElementById('scroll');
window.onscroll = function() {if (scrollY >= 600) {scroll.style.display = 'block';} else {scroll.style.display = 'none';}};
scroll.onclick =function (){window.scroll({left: 0 ,top:0, behavior: "smooth"})}