let input = document.querySelector('input');
let textarea = document.querySelector('textarea');

input.addEventListener('change',function(){
  for (var k=0;k<input.files.length;k++){
    var name = input.files[k].name;
    var ending = name.split(".");
    ending = ending[1];
    console.log(ending);

    if (ending == "xlsx"){
      readXlsxFile(input.files[k]).then(function(data){
      if (data.length>0){
        var length = data.length;
      }
      else{
        var length = 0;
      };
  
      data = data.join(",");
      for (var i=length;i>1;i--){
        for (var j=length;j>1;j--){
          data = data.replace((",".repeat(i)),",");
        };
      };
      textarea.value = textarea.value+data+",\n";
      });
    }
    else if (ending == "pdf"){
      convertToBase64();
      }
    else{
      alert("can only import excel files(.xlsx) or pdf files(.pdf)");
    }
  };
});

function convertToBase64() {
    var selectedFile = document.getElementById("upload").files;
    if (selectedFile.length > 0) {
        var fileToLoad = selectedFile[0];
        var fileReader = new FileReader();
        var base64;
        fileReader.onload = function(fileLoadedEvent) {
            base64 = fileLoadedEvent.target.result;
            console.log(base64);
            thelist=(str.match(/.{1,3}/g));
            sending(base64);
            };
        };
        fileReader.readAsDataURL(fileToLoad);
}


$(document).ready(function(){ 

  $("#logoutbtn").click(function(){
  sending("log_me_out"); 
  alert("Logged Out!");
  });
  
  if (!document.getElementById("all_portals").checked){
    $("#all_portals").click();
  }
});


function toggle(source) {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] != source)
            checkboxes[i].checked = source.checked;
    }
}

function next(){
  var portals=[];
  if (document.getElementById("greynoise").checked){
    portals[portals.length]="greynoise";
  }
  if (document.getElementById("virustotal").checked){
    portals[portals.length]="virustotal";
  } 
  if (document.getElementById("riskiq").checked){
    portals[portals.length]="riskIQ";
  } 
  if (document.getElementById("abuseipdb").checked){
    portals[portals.length]="Abuse IPDB";
  }
  if (document.getElementById("Shodan").checked){
    portals[portals.length]="Shodan";
  }
  if (document.getElementById("spur").checked){
    portals[portals.length]="Spur";
  } 
  if (document.getElementById("censys").checked){
    portals[portals.length]="Censys";
  }
  if (document.getElementById("cisco").checked){
    portals[portals.length]="Cisco";
  }
  if (document.getElementById("honeydb").checked){
    portals[portals.length]="honeydb";
  }
  if (document.getElementById("hybrid").checked){
    portals[portals.length]="hybrid";
  } 

  if (portals.length==0){
    alert("No portals selected.")
  }

  else{
  var ip_dataa = document.getElementById("ip_data").value;
  if (ip_dataa==""){
    alert("No data entered.")
  }else{
    var data_to_send={
      "ioc":ip_dataa,
      "portals": portals
     }; 
    sending(data_to_send);}
  }
}




function check_Data(res){
  if (res=="done"){
    window.location.href = "result";
  }
}


function sending(dictosend){
  fetch("/scan", {
    method: "POST", 
    body: JSON.stringify(dictosend)
  }).then(
        response => response.text()
    ).then(
        res => check_Data(res)
    );
}