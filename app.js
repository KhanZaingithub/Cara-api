
// let pass = document.getElementById("validationDefault02");
// let confirmPass = document.getElementById("validationDefault03");
// let form = document.querySelector("form");
// let text = document.getElementById("invalid-password");
// let email = document.getElementById("validationDefault01");
// text.style.cssText = "margin: 0px; color: red;padding-top: 5px;display:none";
// const reader = new FileReader();


// async function getDta() {
//     form.addEventListener("submit",(event)=>{
//         const formData = new FormData(form);
//         const formDetails = Object.fromEntries(formData.entries());
//         if(pass.value != confirmPass.value){
//             event.preventDefault();
//             text.style.display = "block";
//         }
//         else{
//             event.preventDefault();
//             // app.js
//             const fs = require('fs');
//             const path = require('path');

//             // Define the path to the JSON file
//             const filePath = path.join(__dirname, 'cara/login/login.json');

//             // Function to read data from the JSON file
//             function readData() {
//               if (!fs.existsSync(filePath)) {
//                 return []; // Return an empty array if the file does not exist
//               }

//               const data = fs.readFileSync(filePath, 'utf8');
//               return JSON.parse(data);
//             }

//             // Function to write data to the JSON file
//             function writeData(data) {
//               fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
//             }

//             // Example usage: adding new data
//             function addData(newItem) {
//               const data = readData();
//               data.push(newItem);
//               writeData(data);
//             }

//             // Example usage
//             const newItem = { name: 'John Doe', email: 'john.doe@example.com' };
//             addData(newItem);

//             console.log('Data has been added to the JSON file.');
//             showData();
//             text.style.display = "none";
//         }
//     })
// }

// getDta();
// async function showData() {
//     let a = await fetch("cara/login/login.json");
//     let response = await a.text();
//     const data = JSON.parse(response);
//     for(let i = 0; i<data.length;i++){
//         console.log(data[i]);
//     }
// }

// // async function signup() {
// //     let a = await fetch("cara/login/login.json");
// //     let response = await a.text();
// //     const data = JSON.parse(response);
    
// // }

const fs = require('fs');
const path = require('path');

// Define the path to the JSON file
const filePath = path.join(__dirname, 'cara/login/login.json');

// Function to read data from the JSON file
function readData() {
  if (!fs.existsSync(filePath)) {
    return []; // Return an empty array if the file does not exist
  }

  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

// Function to write data to the JSON file
function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// Example usage: adding new data
function addData(newItem) {
  const data = readData();
  data.push(newItem);
  writeData(data);
}

// Example usage
const newItem = { name: 'John Doe', email: 'john.doe@example.com' };
addData(newItem);

console.log('Data has been added to the JSON file.');




