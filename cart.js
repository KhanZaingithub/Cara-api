(async function addCart() {
  let loader = document.querySelector(".dot-spinner");
  let table = document.querySelectorAll(".js-table");
  let cart_details = document.getElementById("cart-js");
  let index = localStorage.getItem("index");
  console.log(index);
  let a = await fetch(`https://fakestoreapi.com/carts/user/${index + 1}`);
  let response = await a.text();
  let data = JSON.parse(response);
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].products.length; j++) {
      let b = await fetch(
        `https://fakestoreapi.com/products/${data[i].products[j].productId}`
      );
      let response_1 = await b.text();
      let data_1 = JSON.parse(response_1);
      cart_details.innerHTML =
        cart_details.innerHTML +
        `<tr>
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
          }" id="0" class="quantity" type="text" />
        </td>
        <td>$<span class="rate">${
          data[i].products[j].quantity * data_1.price
        }</span></td>
      </tr>`;
    }
  }
  loader.style.display = "none";
  table.forEach((event) => {
    event.style.display = "block";
  });
  // cart_details.addEventListener("load", () => {
  //   console.log("load");
  // });
  let cart_quantity = document.querySelectorAll(".quantity");
  let subtotalRate = document.querySelectorAll(".rate");
  let price = document.querySelectorAll(".originalrate");
  let deleteBtn = document.querySelectorAll(".delete");
  let cartTotal = document.querySelector("#total .subtotal");
  let finalTotal = document.querySelector("#total .total");
  let subtotal = 0;

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
      index = event.id;
      let rateproduct = Number(price[index].textContent);
      if (event.value == 1 || event.value == "") {
        subtotalRate[index].textContent = rateproduct;
        subtotal = subtotalF();
        cartTotal.textContent = subtotal;
      } else {
        subtotalRate[index].textContent = rateproduct * event.value;
        subtotal = subtotalF();
        cartTotal.textContent = subtotal;
      }
    });
  });

  subtotal = subtotalF();
  cartTotal.textContent = subtotal;
  finalTotal.textContent = subtotal;
})();
