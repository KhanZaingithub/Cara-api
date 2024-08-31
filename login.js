async function login() {
  let a = await fetch("https://fakestoreapi.com/users");
  let response = await a.text();
  const data = JSON.parse(response);
  let email = document.querySelector("form .email");
  let password = document.querySelector("form .password");
  let not_valid = document.querySelector(".incorrect");
  let form = document.querySelector("form");
  let index;
  form.addEventListener("submit", function (event) {
    let emailCheck = false;
    event.preventDefault();
    for (let i = 0; i < data.length; i++) {
      if (data[i].email == email.value.toLowerCase()) {
        emailCheck = true;
        index = i;
      }
    }
    if (emailCheck) {
      if (
        data[index].email == email.value.toLowerCase() &&
        data[index].password == password.value
      ) {
        not_valid.style.display = "none";
        localStorage.setItem("index", index);
        window.location.href = `index.html`;
      }
    } else {
      not_valid.style.display = "block";
    }
  });
}
login();
