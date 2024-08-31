async function product_click() {
  let product = document.querySelectorAll(".js-product");
  product.forEach((e) => {
    e.addEventListener("click", () => {
      let tiitle = e.querySelector(".card .card-body .card-title").textContent;
      let details = e
        .querySelector(".card .card-body .card-text")
        .textContent.trim();
      let price = e.querySelector(".card .card-body #price").textContent;
      let imageP = e.querySelector(".card img").src;

      let srcNext = `single-product.html?lat=${imageP}&price=${price}&desc=${details}&title=${tiitle}`;
      window.location.href = srcNext;
    });
  });
}

async function filter() {
  let filter_btn = document.querySelectorAll(".filter .category button");
  let category;
  filter_btn.forEach((element) => {
    element.addEventListener("click", () => {
      category = element.textContent;
      for (let i = 0; i < filter_btn.length; i++) {
        if (filter_btn[i].classList.value.includes("active")) {
          filter_btn[i].classList.remove("active");
        }
      }
      element.classList.add("active");
      if (category == "All Products") {
        category = "";
      } else {
        category = `/category/${category}`;
      }
      products(category);
      search(category);
    });
  });
}

async function products(category = "/") {
  let a = await fetch(`https://fakestoreapi.com/products${category}`);
  let response = await a.text();
  const data = JSON.parse(response);
  let product = document.querySelector("#products .row");
  product.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    product.innerHTML =
      product.innerHTML +
      `<div class="col-12 col-lg-3 col-md-4 js-product">
      <div class="card">
          <div style="height:350px">
             <img src="${data[i].image}" class=" img-fluid h-100 card-img-top" alt="..." />
          </div>
        <div class="card-body">
          <h5 class="card-title">${data[i].title}</h5>
          <p class="card-text">
            ${data[i].description}
          </p>
          <a href="#" class="btn btn-primary"
            ><i class="bi bi-cart-plus"></i
          ></a>
          <h4 id="price">$${data[i].price}</h4>
        </div>
      </div>
    </div>`;
  }
  product_click();
}

async function search(category) {
  let input = document.querySelector(".filter form input");
  let submit = document.querySelector(".filter form .js-submit");
  let no_data = document.querySelector("#products .no-data");
  let btn = document.querySelector(".buttons");

  if (category != undefined) {
    submit.addEventListener("click", async (e) => {
      e.preventDefault();
      let check = false;
      let a = await fetch(`https://fakestoreapi.com/products${category}`);
      let response = await a.text();
      const data = JSON.parse(response);
      let product = document.querySelector("#products .row");
      product.innerHTML = "";

      for (let i = 0; i < data.length; i++) {
        if (
          data[i].title.toLowerCase().includes(input.value.toLowerCase()) ||
          data[i].description.toLowerCase().includes(input.value.toLowerCase())
        ) {
          check = true;
          product.innerHTML =
            product.innerHTML +
            `<div class="col-12 col-lg-3 col-md-4 js-product">
              <div class="card">
                 <div style="height:350px">
                   <img src="${data[i].image}" class=" img-fluid h-100 card-img-top" alt="..." />
                  </div>
                <div class="card-body">
                  <h5 class="card-title">${data[i].title}</h5>
                  <p class="card-text">
                    ${data[i].description}
                  </p>
                  <a href="#" class="btn btn-primary"
                    ><i class="bi bi-cart-plus"></i
                  ></a>
                  <h4 id="price">${data[i].price}</h4>
                </div>
              </div>
            </div>`;
        }
      }
      if (check) {
        no_data.style.display = "none";
        btn.style.display = "block";
      } else {
        no_data.style.cssText = "display: flex; justify-content: center;";
        btn.style.display = "none";
      }
    });
  }

  product_click();
}

async function loginCeck() {
  let index = localStorage.getItem("index");
  let a = await fetch(`https://fakestoreapi.com/users?limit=${index + 1}`);
  let response = await a.text();
  const data = JSON.parse(response);
  let loginDiv = document.querySelector(".navbar .login");
  let profileDiv = document.querySelector(".navbar .profile");
  let profileName = document.getElementById("profile-name");

  if (index != null) {
    loginDiv.style.display = "none";
    profileDiv.style.display = "flex";
    profileName.textContent = data[index].name.firstname;
  } else {
    loginDiv.style.display = "block";
    profileDiv.style.display = "none";
  }
  Logout();
}

function Logout() {
  let btn = document.getElementById("logout");
  btn.addEventListener("click", (event) => {
    localStorage.removeItem("index");
  });
}

loginCeck();

search();

filter();

products();
