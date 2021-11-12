
$(document).ready(function(){   
  sending({"job":"get_stats"});

  $("#logoutbtn").click(function(){
    sending({"job":"log_me_out"}); 
    alert("Logged Out!");
    location.reload(); 
  });

  $("#update").click(function(){
      sending({"job":"update"}); 
    });  
});


function check_Data(res){
  res = (JSON.parse(res))

  $("#user").html("Hello<br> "+res['user']);

  if(res['user']=="Popick"){
    $(".up").addClass("green"); 
  }else if(res['user']=="Pazy"){
    $(".up").addClass("red"); 
  }

  $("#last").text("Last user: " + res['last']);
  if(res['last']=="Popick"){
    $(".down").addClass("green"); 
  }else if(res['last']=="Pazy"){
    $(".down").addClass("red"); 
  }

  $("#time").text(res['time'])
  var $list = $('.gradient-list');
  $list.empty()
  for (var i in res['log']) {
    if (res['log'][i]['user']=="Popick"){
      $list.append('<li class="ey">'+res['log'][i]['content']+'<button class="deletebtn" role="button">&#10005;</button></li>');
    }if (res['log'][i]['user']=="Pazy"){
      $list.append('<li class="pz">'+res['log'][i]['content']+'<button class="deletebtn" role="button">&#10005;</button></li>');
    }
  }

   $(".deletebtn").click(function(){
      var thisPos = $(this).parent().index()
      $(this).parent().addClass("removed-item");

      setTimeout(function(){
        $('.removed-item').remove();
        sending({"job":"newLog","position":thisPos})
      }, 600);

      
    });
}


function sending(dictosend){
  fetch("/home", {
    method: "POST", 
    body: JSON.stringify(dictosend)
  }).then(
        response => response.text()
    ).then(
        res => check_Data(res)
    );
}