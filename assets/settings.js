


function save(){
	/*the function saves the api keys that the user entered*/
	
	keys={
		"Password": document.getElementById("pswrd").value,
		"GreyNoise API": document.getElementById("gnapi").value,
		"VirusTotal API": document.getElementById("vtapi").value,
		"AbuseIPDB API": document.getElementById("dbapi").value,
		"RiskIQ API": document.getElementById("iqapi").value,
		"RiskIQ Email": document.getElementById("iqmapi").value,
		"Shodan API": document.getElementById("shapi").value,
		"Censys UID": document.getElementById("cniapi").value,
		"Censys SECRET": document.getElementById("cnsapi").value,
		"Cisco": document.getElementById("csapi").value
	};
	sending(keys);

}

$(document).ready(function(){
  $("#logoutbtn").click(function(){
  sending("log_me_out"); 
  alert("Logged Out!");
  });
  
	if ($("#editgnapi").html()=='<i class="fas fa-edit" aria-hidden="true"></i>'){
			$("#gnapi").attr("disabled",true);
		}
	if ($("#editvtapi").html()=='<i class="fas fa-edit" aria-hidden="true"></i>'){
			$("#vtapi").attr("disabled",true);
		}
	if ($("#editdbapi").html()=='<i class="fas fa-edit" aria-hidden="true"></i>'){
			$("#dbapi").attr("disabled",true);
		}
	if ($("#editiqapi").html()=='<i class="fas fa-edit" aria-hidden="true"></i>'){
			$("#iqapi").attr("disabled",true);
		}
	if ($("#editiqmapi").html()=='<i class="fas fa-edit" aria-hidden="true"></i>'){
			$("#iqmapi").attr("disabled",true);
		}
	if ($("#editshapi").html()=='<i class="fas fa-edit" aria-hidden="true"></i>'){
			$("#shapi").attr("disabled",true);
		}
	if ($("#editcniapi").html()=='<i class="fas fa-edit" aria-hidden="true"></i>'){
			$("#cniapi").attr("disabled",true);
		}	
	if ($("#editcnsapi").html()=='<i class="fas fa-edit" aria-hidden="true"></i>'){
			$("#cnsapi").attr("disabled",true);
		}
	if ($("#editcsapi").html()=='<i class="fas fa-edit" aria-hidden="true"></i>'){
			$("#csapi").attr("disabled",true);
		}

	
	$("#editgnapi").click(function edit(){
		enbtn("#editgnapi","#gnapi");
	})
	$("#editvtapi").click(function edit(){
		enbtn("#editvtapi","#vtapi");
	})
	$("#editdbapi").click(function edit(){
		enbtn("#editdbapi","#dbapi");
	})
	$("#editiqapi").click(function edit(){
		enbtn("#editiqapi","#iqapi");
	})
	$("#editiqmapi").click(function edit(){
		enbtn("#editiqmapi","#iqmapi");
	})
	$("#editshapi").click(function edit(){
		enbtn("#editshapi","#shapi");
	})
	$("#editcnsapi").click(function edit(){
		enbtn("#editcnsapi","#cnsapi");
	})
	$("#editcniapi").click(function edit(){
		enbtn("#editcniapi","#cniapi");
	})
	$("#editcsapi").click(function edit(){
		enbtn("#editcsapi","#csapi");
	})

 })

function enbtn(btnid,inid){
/* the function change the state of the input disabled atterbute
*/
	if ($(btnid).html()=='<i class="fas fa-save" aria-hidden="true"></i>'){
			$(btnid).html('<i class="fas fa-edit"></i>');
			$(inid).attr("disabled",true);
		}else{
			$(btnid).html('<i class="fas fa-save"></i>');
			$(inid).attr("disabled",false);
		}
}


function toggle(source) {
/*
	the function check and uncheck all the checkboxes
*/

    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] != source)
            checkboxes[i].checked = source.checked;
    }
}


function gen(){
/*
the function sends the portals you want to generated api keys to
*/
	var portals=[];
	if (document.getElementById("greynoise").checked){
		portals[portals.length]="greynoise";
	}if (document.getElementById("riskiq").checked){
		portals[portals.length]="riskiq";
	}if (document.getElementById("abuseipdb").checked){
		portals[portals.length]="abuse";
	}if (document.getElementById("Shodan").checked){
		portals[portals.length]="shodan";
	}if (document.getElementById("censys").checked){
		portals[portals.length]="censys";
	}

	if (portals.length==0){
		alert("No portals selected.");
	}
	else{
		sending("portalstogen:"+portals);
	}
}



function passtgl() {
/*
	the function hides and shows the password
*/
  var password_input = document.getElementById("pswrd");
  if (password_input.type === "password") {
    password_input.type = "text";
    $("#passbtn").html('<i class="fas fa-eye-slash"></i>');
  } else {
    password_input.type = "password";
    $("#passbtn").html('<i class="fas fa-eye"></i>');

  }
} 


function check_Data(res){
   if (res=="Wrong password"){
   	alert("Wrong Password")
   	$("#pswrd").css("border","2px solid red");
   };
   if(res=="accepted"){
   	alert("Saved")
   	$("#pswrd").css("border","2px solid #38c248");
   };
}


function sending(dictosend){
  fetch("/settings", {
    method: "POST", 
    body: JSON.stringify(dictosend)
  }).then(
        response => response.text()
    ).then(
        res => check_Data(res)
    );
}