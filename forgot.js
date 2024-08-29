let email = document.querySelector(".form .email");
let otp = document.querySelector(".form .OTP");
let password = document.querySelector(".form .password");
let confirm_password = document.querySelector(".form .confirm-password");
let form = document.getElementById("form");
let btn = document.getElementById("js-btn");
let generateotp = 20;
let emailText = document.getElementById("invalid-email");
let otpText = document.getElementById("invalid-otp");
let passText = document.getElementById("invalid-password");
otp.style.display = "none";
password.style.display = "none";
confirm_password.style.display = "none";
let count = true;

function OTP() {
  let otp = String(Math.floor(Math.random() * (9 - 1 + 1) + 1));
  for (let i = 0; i < 3; i++) {
    otp += String(Math.floor(Math.random() * (9 - 1 + 1) + 1));
  }
  return otp;
}
async function reads() {
  const path = "cara/login/login.json";
  const fs = require(path);

  const data = fs.readFileSync("login.json");
}
reads();

generateotp = OTP();

function emailsend(email, getOTP) {
  let params = {
    name: "Cara",
    otp: getOTP,
    email_id: email,
  };
  emailjs.send("service_9k2h0ak", "template_r4hy9xe", params);
}

async function forgotPassword() {
  let a = await fetch("cara/login/login.json");
  let response = await a.text();
  const data = JSON.parse(response);
  let count = false;
  form.addEventListener("submit", function (event) {
    let loginCheck = false;
    let index;
    for (let i = 0; i < data.length; i++) {
      if (email.lastElementChild.value == data[i].email) {
        loginCheck = true;
        index = i;
      }
    }
    if (loginCheck) {
      event.preventDefault();
      if (!count) {
        emailsend(data[index].email, generateotp);
        count = true;
      }
      btn.innerText = "Check OTP";
      emailText.style.display = "none";
      email.lastElementChild.required = false;
      email.style.display = "none";
      otp.style.display = "block";
      otp.lastElementChild.required = true;
      if (otp.lastElementChild.value == generateotp) {
        otpText.style.display = "none";
        otp.lastElementChild.required = false;
        otp.style.display = "none";
        password.lastElementChild.required = true;
        confirm_password.lastElementChild.required = true;
        password.style.display = "block";
        confirm_password.style.display = "block";
        btn.innerText = "Change password";
        if (
          password.lastElementChild.value ===
            confirm_password.lastElementChild.value &&
          password.lastElementChild.value != ""
        ) {
          window.location = "login.html";
        } else if (password.lastElementChild.value != "") {
          passText.style.display = "block";
        }
      } else if (otp.lastElementChild.value != "") {
        otpText.style.display = "block";
      }
    } else {
      event.preventDefault();
      emailText.style.display = "block";
    }
  });
}
forgotPassword();
