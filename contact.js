(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

async function loginCeck() {
  let a = await fetch("cara/login/login.json");
  let response = await a.text();
  const data = JSON.parse(response);
  let loginDiv = document.querySelector(".navbar .login");
  let profileDiv = document.querySelector(".navbar .profile");
  let profileName = document.getElementById("profile-name");
  let index = localStorage.getItem("index");

  if (index != null) {
    console.log(loginDiv);
    loginDiv.style.display = "none";
    profileDiv.style.display = "flex";
    profileName.textContent = data[index].name;
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
