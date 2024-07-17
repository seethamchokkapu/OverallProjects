

let table = document.querySelector(".showtable");

let Firstname = document.querySelector(".firstname");
let Lastname = document.querySelector(".lastname");
let contactnum = document.querySelector(".contacts");
let birth = document.querySelector(".dob");
addBtn = document.querySelector(".btn-add");
addBtn.addEventListener("click", data);
var getData;
var ID;
replaceData=document.querySelector(".replace-btn");


async function data() {
    let res = await fetch("http://localhost:3000/contact", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            FIRSTNAME: `${Firstname.value}`,
            LASTNAME: `${Lastname.value}`,
            CONTACTNUM: `${contactnum.value}`,
            DOB: `${birth.value}`,

        })
    })

        .then(x => { return x.json() })
        .then(y => { console.log(y) })
        .catch(a => { console.log("errorrrrrr")})
    table.innerHTML = ""
    tabledata();
}



async function tabledata() {
    let getMethod = await fetch("http://localhost:3000/contact")
     getData = await getMethod.json();
    for (let i = 0; i < getData.length; i++) {
        table.innerHTML+= `
        <tr>
        <td>${getData[i].FIRSTNAME}</td>
        <td>${getData[i].LASTNAME}</td>
        <td>${getData[i].CONTACTNUM}</td>
        <td>${getData[i].DOB}</td>
        <td><button  onclick="editbtn('${getData[i].id}')">EDIT</button></td>
        <td><button onclick="deletebtn('${getData[i].id}')">DELETE</button></td>
        </tr>`
    }
}


async function deletebtn(number) {
    console.log(number);
    var delContent = await fetch(`http://localhost:3000/contact/${number}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
    
    tabledata();
    table.innerHTML="" ;
}



async function editbtn(idValue) {
    console.log("hello");
    console.log(idValue);

    var displayContent = await fetch(`http://localhost:3000/contact/${idValue}`,{
        method:"GET"
    });
    var content = await displayContent.json();
    Firstname.value = content.FIRSTNAME;
    Lastname.value = content.LASTNAME;
    contactnum.value = content.CONTACTNUM;
    birth.value = content.DOB;
   ID=idValue;
   // addBtn.removeEventListener("click", data);
    replaceData.addEventListener("click",editData)
}


async function editData() {
    
    var editContent = await fetch(`http://localhost:3000/contact/${ID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            FIRSTNAME: `${Firstname.value}`,
            LASTNAME: `${Lastname.value}`,
            CONTACTNUM: `${contactnum.value}`,
            DOB: `${birth.value}`,
        })
    })
    tabledata();
    table.innerHTML=""; 
    
}



function clearAll() {
    table.innerHTML = "";
}