 let sidebarButtons = document.querySelector(".sidebar");
 var getData;
 var tableData = document.querySelector(".entering-data");
 var p;
 var i;
 var totalprice = 0;
 var tax;
 var overAllprice;
 var orderTicketBtn=document.getElementById("order-ticket");
 var enterValue;
 var idValue1;
 var selectedItems=[];
 var discountTotal;
 var orderItems=document.getElementById("order-items");
 var orderBtn=document.querySelector(".orders");
 var currentBtn=document.querySelector(".current");
 var viewOrderDetails=document.querySelector(".orderDetails");
 var viewSummeryList=document.querySelector(".summery");
 var gettingData;
 var clearTablehead=document.querySelector(".order-table");
 var clearAll = document.querySelector(".clear-btn");
 clearAll.addEventListener("click", clear);
 var n;
 var spanNumber=document.querySelector(".span-number");
var cancel = document.querySelector(".cancel_order");
var isCanceled = "active";
cancel.style.display="none";
async function sideDisplayContent() {

   p=await fetch("http://localhost:3000/items")
   getData=await p.json();

   for (i = 0; i < getData.length; i++) {
      sidebarButtons.innerHTML += `<button class="container_btns" onclick="rightBillChart(${i})">
    ${getData[i].name}<br>${getData[i].price}</button>`
   }
 
}
sideDisplayContent();


function rightBillChart(idValue) {  
selectedItems.push({
   "name":getData[idValue].name,
    "price":getData[idValue].price,
    "quantity":1,
})
 console.log(selectedItems);
 table();
}

function table(){
   totalprice=0;
   tableData.innerHTML="";
 for(var k=0;k<selectedItems.length;k++){
   tableData.innerHTML+=
      `<tr>
          
            <td>${selectedItems[k].name}</td>
            <td><input type="number" value="${selectedItems[k].quantity}" class="user_input" onchange="changeInput(${k})"></td>
            <td>${selectedItems[k].price*selectedItems[k].quantity}</td>    
        </tr>`  
        totalprice+=selectedItems[k].price*selectedItems[k].quantity;     
        
  }

   console.log(totalprice);
 discountCalculations();
 
  }  

function discountCalculations(){
   tax = (totalprice / 100) * 4;
   console.log(tax);
   discount = (totalprice / 100) *10;
   console.log(discount);
   document.getElementById("discount").innerHTML = `${discount}`;
   document.getElementById("tax").innerHTML = `${tax}`;
   discountTotal= totalprice - discount;
   overAllprice = totalprice - discount + tax;
   console.log(overAllprice);
   document.getElementById("charge").innerHTML = `Charge${overAllprice}`;  
  
}                                                                         

function changeInput(id) {
   //alert("hello");
  var changeuserInput=document.querySelectorAll(".user_input");
     enterValue=changeuserInput[id].value;
     selectedItems[id].quantity=enterValue;
  // alert(selectedItems[id].quantity);
   table();
}                             

function clear() {
   tableData.innerHTML = "";
   document.getElementById("discount").innerHTML = 0;
   document.getElementById("tax").innerHTML = 0;
   document.getElementById("charge").innerHTML = 0;

}                              

orderTicketBtn.addEventListener("click",postData);
                                                     
async function postData(){
   var custumerName=document.querySelector(".input-field");
         await fetch("http://localhost:3000/orders",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({
               
            customername  :custumerName.value,
            discountamount:discount,
            totalAmount   :discountTotal,
            taxamount     :tax,
            billamount    :overAllprice,
            status: isCanceled,
            orderitems:selectedItems

          })


          })
         
}
   
document.querySelector(".order-table").style.display="none";
orderBtn.addEventListener("click",getJson);

async function getJson(){
   clearTablehead.style.display="none";
   orderItems.innerHTML="";
 
    document.querySelector(".container").style.display="none";
    document.querySelector(".order-table").style.display="block";

   var s= await fetch("http://localhost:3000/orders")
   gettingData=await s.json();

  console.log(gettingData);
   for(var l=0;l<gettingData.length;l++){

      let statused = gettingData[l].status;

      statused == isCanceled ? "active" : "Inactive";

      orderItems.innerHTML+=
                 `<tr>

                 <td class="expand">${gettingData[l].customername}</td>
                 <td class="expand">${gettingData[l].discountamount}</td>
                 <td class="expand">${gettingData[l].taxamount}</td>
                 <td class="expand">${gettingData[l].billamount}</td>
                 <td class="expand">${statused}</td>
                 <td class="expand"> <button class="orderDetails" onclick="viewSummery(${l})">view</button> </td>

                 <tr>`

   }
   orderNumber();
   
}

currentBtn.addEventListener("click", currentpageDisplay)

  function currentpageDisplay(){
   cancel.style.display="none";
   document.querySelector(".container").style.display="block";
   document.querySelector(".order-table").style.display="none";
   viewSummeryList.style.display="none";
   orderItems.style.display="block";
  }



  function viewSummery(list){
   clearTablehead.style.display="none";
   cancel.style.display="block";
   var custumerName=document.querySelector(".input-field");
   viewSummeryList.innerHTML="";
   
   viewSummeryList.innerHTML+=`<h2>******ORDER SUMMERY******</h2>`
   viewSummeryList.innerHTML+=Date();                         
   for(n=0;n<gettingData[list].orderitems.length;n++){
      var equalAmount=gettingData[list].orderitems[n].price * gettingData[list].orderitems[n].quantity;
      viewSummeryList.innerHTML+=`<p>${gettingData[list].orderitems[n].name}=${gettingData[list].orderitems[n].price}*${gettingData[list].orderitems[n].quantity}=${equalAmount}</p>`
      
      }
     
   viewSummeryList.innerHTML+=

                  ` <p>DISCOUNT (10%)=${gettingData[list].discountamount}</p>
                    <p>Total=${gettingData[list].totalAmount}</p>
                    <p>GST (4%)=${gettingData[list].taxamount}</p>
                    <p>TOTAL AMOUNT:${gettingData[list].billamount}</p>`
                     viewSummeryList.style.display="block";
                     orderItems.style.display="none";              
  }
  
async function orderNumber(){
   var s= await fetch("http://localhost:3000/orders")
   gettingData=await s.json();
  spanNumber.innerHTML=gettingData.length;

}

cancel.addEventListener("click",cancel_order);

function cancel_order(){
   isCanceled = "Inactive";
   clearTablehead.style.display="none";
   cancel.style.display="none";
   viewSummeryList.style.display="none";
   document.querySelector(".container").style.display="block";
   orderItems.style.display="block";

   selectedItems.pop();
   table();
}

//let sidebarButtons = document.querySelector(".sidebar");

/*var getData;

var tableData = document.querySelector(".entering-data");

var p;

var i;

var totalprice = 0;

var tax;

var overAllprice;

var orderTicketBtn = document.getElementById("order-ticket");

var enterValue;

var idValue1;

var selectedItems = [];

var discountTotal;

var orderItems = document.getElementById("order-items");

var orderBtn = document.querySelector(".orders");

var currentBtn = document.querySelector(".current");

var viewOrderDetails = document.querySelector(".orderDetails");

var viewSummeryList = document.querySelector(".summery");

var gettingData;

var clearTablehead = document.querySelector(".order-table");

var clearAll = document.querySelector(".clear-btn");

clearAll.addEventListener("click", clear);

var n;

var cancel = document.querySelector(".cancel");

var cancel_order = document.querySelector(".cancel_order");

cancel_order.style.display = "none";

var isCanceled = "active";

var spanNumber = document.querySelector(".span-number");

var index = 0;

orderNumber();

async function sideDisplayContent() {



   p = await fetch("http://localhost:3000/items")

   getData = await p.json();



   for (i = 0; i < getData.length; i++) {

      sidebarButtons.innerHTML += `<button class="container_btns" onclick="rightBillChart(${i})">

    ${getData[i].name}<br>${getData[i].price}</button>`

   }



}

sideDisplayContent();




function rightBillChart(idValue) {

   index = idValue;

   selectedItems.push({

      "name": getData[idValue].name,

      "price": getData[idValue].price,

      "quantity": 1

   })

   console.log(selectedItems);

   table();

}



function table() {

   totalprice = 0;

   tableData.innerHTML = "";

   for (var k = 0; k < selectedItems.length; k++) {

      tableData.innerHTML +=

         `<tr>

          

            <td>${selectedItems[k].name}</td>

            <td><input type="number" value="${selectedItems[k].quantity}" class="user_input" onchange="changeInput(${k})"></td>

            <td>${selectedItems[k].price * selectedItems[k].quantity}</td>    

        </tr>`

      totalprice += selectedItems[k].price * selectedItems[k].quantity;



   }



   console.log(totalprice);

   discountCalculations();



}



function discountCalculations() {

   tax = (totalprice / 100) * 4;

   console.log(tax);

   discount = (totalprice / 100) * 10;

   console.log(discount);

   document.getElementById("discount").innerHTML = `${discount}`;

   document.getElementById("tax").innerHTML = `${tax}`;

   discountTotal = totalprice - discount;

   overAllprice = totalprice - discount + tax;

   console.log(overAllprice);

   document.getElementById("charge").innerHTML = `Charge${overAllprice}`;



}



function changeInput(id) {

   //alert("hello");

   var changeuserInput = document.querySelectorAll(".user_input");

   enterValue = changeuserInput[id].value;

   selectedItems[id].quantity = enterValue;

   // alert(selectedItems[id].quantity);

   table();

}



function clear() {

   tableData.innerHTML = "";

   document.getElementById("discount").innerHTML = 0;

   document.getElementById("tax").innerHTML = 0;

   document.getElementById("charge").innerHTML = 0;



}



orderTicketBtn.addEventListener("click", postData);



async function postData() {

   var custumerName = document.querySelector(".input-field");

   // alert("hai");

   await fetch("http://localhost:3000/orders", {



      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({



         customername: custumerName.value,

         discountamount: discount,

         totalAmount: discountTotal,

         taxamount: tax,

         billamount: overAllprice,

         status: isCanceled,

         orderitems: selectedItems



      })




   })



}



document.querySelector(".order-table").style.display = "none";

orderBtn.addEventListener("click", getJson);



async function getJson() {

   clearTablehead.style.display = "none";

   orderItems.innerHTML = "";



   document.querySelector(".container").style.display = "none";

   document.querySelector(".order-table").style.display = "block";



   var s = await fetch("http://localhost:3000/orders")

   gettingData = await s.json();



   console.log(gettingData);

   for (var l = 0; l < gettingData.length; l++) {

      // if (gettingData[l].status == "active") {

      let statused = gettingData[l].status;

      statused == isCanceled ? "active" : "Inactive";

      orderItems.innerHTML +=

         `<tr>



         <td class="expand">${gettingData[l].customername}</td>

         <td class="expand">${gettingData[l].discountamount}</td>

         <td class="expand">${gettingData[l].taxamount}</td>

         <td class="expand">${gettingData[l].billamount}</td>

         <td class="expand">${statused}</td>



         <td class="expand"> <button class="orderDetails" onclick="viewSummery(${l})">view</button> </td>



         <tr>`

   }



}

orderNumber();





currentBtn.addEventListener("click", currentpageDisplay)



function currentpageDisplay() {

   document.querySelector(".container").style.display = "block";

   document.querySelector(".order-table").style.display = "none";

   viewSummeryList.style.display = "none";

   orderItems.style.display = "block";

}





function viewSummery(list) {

   console.log(list);

   clearTablehead.style.display = "none";

   var custumerName = document.querySelector(".input-field");

   viewSummeryList.innerHTML = "";



   viewSummeryList.innerHTML += `<h2>ORDER SUMMERY</h2>`

   for (n = 0; n < gettingData[list].orderitems.length; n++) {

      const item = gettingData[list].orderitems[n]

      const itemAsString = JSON.stringify(item)

      var equalAmount = gettingData[list].orderitems[n].price * gettingData[list].orderitems[n].quantity;

      viewSummeryList.innerHTML += `<span>${item.name}=${item.price}*${item.quantity}=${equalAmount}</span><span id="items"><input class="checkbox" type="checkbox" value=${itemAsString}></span><br>`



   } gettingData



   viewSummeryList.innerHTML +=



      ` <p>DISCOUNT (10%)=${gettingData[list].discountamount}</p>

                    <p>Total=${gettingData[list].totalAmount}</p>

                    <p>GST (4%)=${gettingData[list].taxamount}</p>

                    <p>TOTAL AMOUNT:${gettingData[list].billamount}</p>`

   viewSummeryList.style.display = "block";

   orderItems.style.display = "none";

}



async function orderNumber() {

   var s = await fetch("http://localhost:3000/orders")

   gettingData = await s.json();

   cancel_order.style.display = "block";

   spanNumber.innerHTML = gettingData.length;



}

cancel_order.addEventListener("click", order);



function order() {

   

    viewSummeryList.style.display = "none";

    document.querySelector(".container").style.display = "block";

   //document.querySelector(".order-table").style.display="";



   selectedItems.pop();

   table();

}*/



/*function onCheck() {

   var elements = document.getElementById('items');



   for (var i = 0; i < elements.length; i++) {

      const checkbox = elements[i]

      const value = JSON.parse(checkbox.value)

      selectedItems = [

         ...selectedItems,

         {

            "name": value.name,

            "price": value.price,

            "quantity": 1,

            "status": checkbox.checked ? "Inactive" : "active"

         }

      ]



      console.log(selectedItems)

   }

}*/
  
