(async function addCart() {
  let loader = document.querySelector(".dot-spinner");
  let table = document.querySelectorAll(".js-table");
  let cart_details = document.getElementById("cart-js");
  let product_id;
  let index = localStorage.getItem("index");
  let data;
  let error_msg = document.getElementById("error-msg")
  try {
    let a = await fetch(`https://fakestoreapi.com/carts/user/${index + 1}`);
    let response = await a.text();
    data = JSON.parse(response);
  } catch(err) {
    // catches errors both in fetch and response.json
    loader.style.display = "none"
    error_msg.style.display = "block"
  }
  let arr =[];
  let idCount = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].products.length; j++) {
      let data_1
      try {
        let b = await fetch(
          `https://fakestoreapi.com/products/${data[i].products[j].productId}`
        );
        let response_1 = await b.text();
        data_1 = JSON.parse(response_1);
      } catch(err) {
        // catches errors both in fetch and response.json
        loader.style.display = "none"
        error_msg.style.display = "block"
      }
     
      

      if(arr.includes(data_1.id)){
        let total_quantity = data[i-1].products[data_1.id-1].quantity + data[i].products[j].quantity;
        let element = cart_details.firstElementChild
       for(let i = 0; i<data[0].products.length;i++){
        if(element.id == data_1.id){
          element.lastElementChild.firstElementChild.textContent = data_1.price * total_quantity;
          element.lastElementChild.previousElementSibling.firstElementChild.setAttribute("value",total_quantity);
        }
        element = element.nextElementSibling;
       }
       continue;
      }
      cart_details.innerHTML =
        cart_details.innerHTML +
        `<tr id="${data_1.id}">
        <th class="delete"><i class="bi bi-x-circle"></i></th>
        <td>
          <div style="height:100px">
            <img class="img-fluid h-100" src="${data_1.image}" alt="" />
          </div>
        </td>
        <td>
          <p>
            ${data_1.description}
            for Men
          </p>
        </td>
        <td>
          <p>$<span class="originalrate">${data_1.price}</span></p>
        </td>
        <td>
          <input value="${
            data[i].products[j].quantity
          }" id="${idCount}" class="quantity" type="text" />
        </td>
        <td>$<span class="rate">${
          data[i].products[j].quantity * data_1.price
        }</span></td>
      </tr>`;
      arr.push(data_1.id);
      idCount++;
    }
  }
  loader.style.display = "none";
  table.forEach((event) => {
    event.style.display = "block";
  });
  
  let subtotalRate = document.querySelectorAll(".rate");
  let price = document.querySelectorAll(".originalrate");
  let deleteBtn = document.querySelectorAll(".delete");
  let cartTotal = document.querySelector("#total .subtotal");
  let finalTotal = document.querySelector("#total .total");
  let subtotal = 0;
  let cart_quantity = document.querySelectorAll(".quantity");
  deleteBtn.forEach((event) => {
    event.addEventListener("click", () => {
      event.parentElement.remove();
      subtotalRate = document.querySelectorAll(".rate");
      subtotal = subtotalF();
      cartTotal.textContent = subtotal;
    });
  });

  function subtotalF() {
    subtotal = 0;
    subtotalRate.forEach((event) => {
      subtotal += Number(event.textContent);
    });
    return subtotal.toFixed(2);
  }
  cart_quantity.forEach((event) => {
    event.addEventListener("input", () => {
      product_id = event.id;
      let rateproduct = Number(price[product_id].textContent);
      if (event.value == 1 || event.value == "") {
        subtotalRate[product_id].textContent = rateproduct;
        subtotal = subtotalF();
        cartTotal.textContent = subtotal;
      } else {
        subtotalRate[product_id].textContent = rateproduct * event.value;
        subtotal = subtotalF();
        cartTotal.textContent = subtotal;
      }
      finalTotal.textContent = subtotal;
    });
  });
  subtotal = subtotalF();
  cartTotal.textContent = subtotal;
  finalTotal.textContent = subtotal;
  proceedCheckout();
})();


function proceedCheckout(){
  let proceed = document.getElementById("js-proceed");
  proceed.addEventListener("click",()=>{
    Swal.fire({
      title: "Sorry! This time can't proceed",
      icon: "error",
      confirmButtonText: "OK",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
  })
}

