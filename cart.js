let cart = document.querySelectorAll(".quantity");
let rate = document.querySelectorAll(".rate");
let originalRate = document.querySelectorAll(".originalrate");
let deleteBtn = document.querySelectorAll(".delete");
let subtotalDiv = document.querySelector("#total .subtotal");
let index = 0;
let subtotal = 0;

deleteBtn.forEach((event) => {
  event.addEventListener("click", () => {
    event.parentElement.style.display = "none";
  });
});
function subtotalp() {
  subtotal = 0;
  rate.forEach((event) => {
    subtotal += Number(event.textContent);
  });
  return subtotal;
}
subtotal = subtotalp();
cart.forEach((event) => {
  event.addEventListener("input", () => {
    index = event.id;
    let rateproduct = Number(originalRate[index].textContent);
    if (event.value == 1 || event.value == "") {
      rate[index].textContent = rateproduct;
      subtotal = subtotalp();
      subtotalDiv.textContent = subtotal;
      console.log(subtotal);
    } else {
      rate[index].textContent = rateproduct * event.value;
      subtotal = subtotalp();
      subtotalDiv.textContent = subtotal;
      console.log(subtotal);
    }
  });
});
subtotalDiv.textContent = subtotal;
