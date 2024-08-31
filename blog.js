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
