  var homePage=document.querySelector(".home");
  var servicespage=document.querySelector(".services");
  var aboutUsPage=document.querySelector(".about-us");
  var homePage=document.querySelector(".home");
  var contactUs=document.querySelector(".contact-us");
 
function homepageDisplay(){
    homePage.style.display="block";
    servicespage.style.display="none";
    aboutUsPage.style.display="none";
    contactUs.style.display="none";
}
function servicespageDisplay(){
    homePage.style.display="none";
    servicespage.style.display="block";
    aboutUsPage.style.display="none";
    contactUs.style.display="none";
}
function aboutUspageDisplay(){
    homePage.style.display="none";
    servicespage.style.display="none";
    aboutUsPage.style.display="block";
    contactUs.style.display="none";
}
function displayContact(){
    homePage.style.display="none";
    servicespage.style.display="none";
    aboutUsPage.style.display="none";
    contactUs.style.display="block";
}


function postData(){
    let userName=document.querySelector(".input-field").value;
    let useremail=document.querySelector(".email1").value;
    let atposition=useremail.indexOf("@");
    let dotposition=useremail.indexOf(".");
    if(userName==""||userName==null){
        alert("please provide correct name");
       
      }
    if(atposition<1||dotposition<atposition+2||dotposition+2>=useremail.length||useremail.length<8){
        alert("please enter correct email format");
      }
      else
      {
     fetch("http://localhost:3000/userDetails",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      username:userName,
      email:useremail

    })


    })
    }

      
}