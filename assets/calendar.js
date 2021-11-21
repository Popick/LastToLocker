$(document).ready(function(){  
    sending("getTable");

    $( "#day1" ).click(function() {
      change_day(2);
    });
    $( "#day2" ).click(function() {
      change_day(3);
    });
    $( "#day3" ).click(function() {
      change_day(4);
    });
    $( "#day4" ).click(function() {
      change_day(5);
    });
    $( "#day5" ).click(function() {
      change_day(6);
    });
    $( "#day6" ).click(function() {
      change_day(7);
    });
    
});
  
function check_teacher(the_class) {
  $("."+the_class+":contains('קול סורין')").addClass("yud-alef5");
  $("."+the_class+":contains('בן שיטרית יצחק')").addClass("yud-alef5");
  $("."+the_class+":contains('גירשקין מרינה')").addClass("yud-alef5");
  $("."+the_class+":contains('לוטן לאה')").addClass("yud-alef5");
  $("."+the_class+":contains('לוי אלברט')").addClass("yud-alef5");
  $("."+the_class+":contains('נטליה')").addClass("yud-alef5");
  $("."+the_class+":contains('כהן מאירה')").addClass("yud-alef5");
  $("."+the_class+":contains('שמיר עדנה')").addClass("yud-alef5");
  $("."+the_class+":contains('חינוך')").addClass("yud-alef5");
  $("."+the_class+":contains('שושן אלי')").addClass("yud-alef5");

  $("."+the_class+":not(.yud-alef5)").remove();
}

function fix_table(){
  const d = new Date();
  let day = d.getDay() + 2;

  check_teacher("TTLesson");
  check_teacher("TableExamChange");
  

  change_day(day)
}


function change_day(day){
  $("#table > tbody > tr > td:not(.today)").removeClass("invisible");
  $(".today").removeClass("today");

  $("#table > tbody > tr > td:nth-child("+day+")").addClass("today");
  $("#table > tbody > tr > td:nth-child(1)").addClass("today");
  $("#table > tbody > tr > td:not(.today)").addClass("invisible");
}

function check_Data(res){
  res = (JSON.parse(res))
  $("#table").html(res["calendar"]);
  fix_table(parseInt(res["day"]));
}
  
function sending(dictosend){
    fetch("/calendar", {
      method: "POST", 
      body: JSON.stringify(dictosend)
    }).then(
          response => response.text()
      ).then(
          res => check_Data(res)
      );
  }