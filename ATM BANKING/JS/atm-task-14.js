  var accno=["939233","63050","957325","996655"];
  var pswd=["1234","5678","9012","3456"];
  var bln=[670,1769,5400,3200];
  var currentUser=0;
  var DepositMoney;
  var transactions=[[],[],[],[]];
  var tble=document.getElementById("tableId");
  var DepoHistory=document.getElementById("depo-history");
  var WithHistory=document.getElementById("with-history");
   var transButton=document.getElementById("btn-t");
   var tabledata=document.getElementsByTagName("tr");
  var h=0;var j=0;
document.getElementById("modal").onclick=function(){
  
  document.querySelector(".div1").style.display="block";
  document.querySelector(".clear").style.display="none";
  
}
    
   //validation function >>>>>>>>>>>>>>> 
   
  function validation(){
       var uAcno=document.getElementById("username-validation").value;
       var upswd=document.getElementById("userpassword-validation").value;
        
       if(accno.indexOf(uAcno)==-1){
        alert("enter valid account number");
         if(uAcno==""){
       document.querySelector(".expand").style.display="block";
     //  document.querySelector(".div1").style.display="none";
       }
       }
      else
         {
       
          if(upswd==pswd[accno.indexOf(uAcno)]){
          
           currentUser=accno.indexOf(uAcno);
            document.querySelector(".options-page").style.display="block";
            document.querySelector(".div1").style.display="none";
           
           
            
            document.getElementById("withdraw").innerHTML=bln[currentUser];
             document.getElementById("placed").innerHTML=uAcno;
             document.getElementById("username-validation").value="";
             document.getElementById("userpassword-validation").value="";
            
          
          }
          else
          {
             alert("invalid password");
            
          }
       
       }
       
   }
   
  function cancle(){
    document.querySelector(".options-page").style.display="block";
    document.querySelector(".page-none").style.display="none";
    
     
  }      
  function cancle1(){
    document.querySelector(".options-page").style.display="block";
    document.querySelector(".deposit-page").style.display="none";
    
     
  } 
  function cancle2(){
    document.querySelector(".options-page").style.display="block";
    document.querySelector(".last-page").style.display="none";
    
     
  }  
  function logout(){
    document.querySelector(".clear").style.display="block";
    document.querySelector(".options-page").style.display="none";
    
  }      
   //withdraw function >>>>>>>>>>>>>>>>    
        
        document.getElementById("withdrawform").onclick=function(){
          document.querySelector(".page-none").style.display="block";
          document.querySelector(".options-page").style.display="none";
        
    
          document.querySelector(".btn-withdraw").onclick=function(){
          var withdrawMoney=document.getElementById("enteredMoney").value;
        if(withdrawMoney>bln[currentUser]){
           alert("insufficient money");
          
           }
           else
          {
             bln[currentUser]-=withdrawMoney;
            document.getElementById("withdraw").innerHTML=bln[currentUser];
            
            document.querySelector(".options-page").style.display="block";
         
            document.querySelector(".page-none").style.display="none";
            transactions[currentUser].push({type:"withdraw",amount:withdrawMoney,balance:bln[currentUser]});
            document.getElementById("enteredMoney").value="";
            
          }
          }
          }
          
  //Deposit function >>>>>>>>>>>>>>>>>>>>
          
           document.getElementById("depositMoney").onclick=function(){
           document.querySelector(".deposit-page").style.display="block";
           document.querySelector(".options-page").style.display="none"; 
           document.querySelector(".btn-deposit").onclick=function(){
           
            DepositMoney=document.getElementById("enterMoney").value;
            bln[currentUser]+=Number(DepositMoney);
           
            console.log(bln[currentUser]);
            document.getElementById("withdraw").innerHTML=bln[currentUser];
            document.querySelector(".options-page").style.display="block";
            document.querySelector(".deposit-page").style.display="none";
            transactions[currentUser].push({type:"Deposit",amount:DepositMoney,balance:bln[currentUser]});
            document.getElementById("enterMoney").value="";
            
            
            }
            
            
           
           }
           transButton.onclick=function(){
         tranHistory("all");
     }
           
    DepoHistory.onclick=function(){
   close();
        tranHistory("d");
     
       document.querySelector(".clear").style.display="none";
       
    }        
   WithHistory.onclick=function(){
   close();
        tranHistory("w");
        document.querySelector(".clear").style.display="none";
      
      
    }        
   //function transactions  >>>>>>>>>>>>>>>>>  
      function tranHistory(type)  {   
        alert(type);
          // document.getElementById("btn-t").onclick=function(){
           document.querySelector(".options-page").style.display="block";
            document.querySelector(".last-page").style.display="block";
           document.querySelector(".options-page").style.display="none";
          for( j=0;j<transactions[currentUser].length;j++){
          
           // var tabledata=document.getElementsByTagName("tr");
             tble.innerHTML+=`<tr>
             
             <td>${transactions[currentUser][j].type}</td>
             <td>${transactions[currentUser][j].amount}</td>
             <td>${transactions[currentUser][j].balance}</td>
             </tr>`
             if(type=="all"){
             if(transactions[currentUser][j].type=="withdraw"){
             tabledata[j+1].style.color="red";
             }
             else
             {
                   tabledata[j+1].style.color="green";
             }
             }
             else if(type=="d"){
            
                 if(transactions[currentUser][j].type=="withdraw")
                 {
             tabledata[j+1].style.display="none";
            
            
                 
             }else{
                 tabledata[j+1].style.color="green";
             }
          }else{
         
              if(transactions[currentUser][j].type=="withdraw")
              {
                  tabledata[j+1].style.color="red";
                  
              }else{
                  tabledata[j+1].style.display="none";
              }
          }
           
           
          }
           }
         
   //function close >>>>>>>>>>>>>>>>>>>>>>>>>>> 
   function close(){       
    //document.getElementById("bclose").onclick=function(){
     document.querySelector(".last-page").style.display="none";
      document.querySelector(".clear").style.display="block";
      document.getElementById("tableId");
      
         tble.innerHTML=`<tr>
            <th>Type of Transaction</th>
            <th>Amount</th>
            <th>Total Balance</th>
          </tr>`
   
 }          
 //function cancle button in second page  >>>>>>>>>>>>>>
 document.getElementById("Btn").onclick=function(){
  document.querySelector(".div1").style.display="none";
 document.querySelector(".clear").style.display="block";
 }

 

