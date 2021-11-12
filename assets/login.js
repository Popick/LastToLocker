function save_login(){
  sending({
    "Username":document.getElementById("name").value,
    "Password":document.getElementById("pass").value
  });
} 

$(document).ready(function(){   
  $("body").keyup(function(event){
      if(event.keyCode == 13 && !event.shiftKey){
          save_login();
      }
  });
});


function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
}


function check_Data(res){
  res = (JSON.parse(res))
  if (res["accepted"]=="False"){
    alert("Wrong credentials");
   };
  if(res["accepted"]=="True"){
    alert("accepted");
    window.location.href="/"
   };
}

function passtgl() {
/*
  the function hides and shows the password
*/
  var password_input = document.getElementById("pass");
  if (password_input.type === "password") {
    password_input.type = "text";
    $("#passbtn").html('hide');
  } else {
    password_input.type = "password";
    $("#passbtn").html('show');

  }
} 

function sending(dictosend){
  fetch("/login_me", {
    method: "POST", 
    body: JSON.stringify(dictosend)
  }).then(
        response => response.text()
    ).then(
        res => check_Data(res)
    );
}