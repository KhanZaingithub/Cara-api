let pass = document.getElementById("validationDefault02");
let confirmPass = document.getElementById("validationDefault03");
let form = document.querySelector("form");
let text = document.getElementById("invalid-password");
let email = document.getElementById("validationDefault01");
text.style.cssText = "margin: 0px; color: red;padding-top: 5px;display:none";

// const data = reader.readAsDataURL('cara/login/login.json');
// console.log(data)


function writeTextFile(afilename, output)
{
  var txtFile = new File(afilename);
  txtFile.writeln(output);
  txtFile.close();
}


async function getDta() {
    form.addEventListener("submit",(event)=>{
        const formData = new FormData(form);
        const formDetails = Object.fromEntries(formData.entries());
        if(pass.value != confirmPass.value){
            event.preventDefault();
            text.style.display = "block";
        }
        else{
            event.preventDefault();
            console.log(formDetails)
            showData();
            text.style.display = "none";
        }
    })
}

getDta();
async function showData() {
    let a = await fetch("cara/login/login.json");
    let response = await a.text();
    const data = JSON.parse(response);
    for(let i = 0; i<data.length;i++){
        console.log(data[i]);
    }
}





