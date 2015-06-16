var jsonData;
$(document).ready(function ()
{
  $("#input-data1, #input-data2").keyup(function(){
    var lat1 = $('#latitude1').val();
    var lon1 = $('#longitude1').val();
    var lat2 = $('#latitude2').val();
    var lon2 = $('#longitude2').val();
    if(lat1 <= 90 && lat1 >=(-90) && lat2<=90 && lat2 >= (-90) &&
    lon1<=180 && lon1 >=(-180) && lon2<=180 && lon2>=(-180) &&
    lat1 !== "" && lat2 !== "" && lon1 !== "" && lon2 !== ""){
      $(".btn").removeClass("btn-danger getNewData");
      $(".btn").addClass("btn-success getNewData");
      $(".btn").attr("disabled", false);
    } else{
      $(".btn").removeClass("btn-success getNewData");
      $(".btn").addClass("btn-danger getNewData");
      $(".btn").attr("disabled", true);
    }
  });

  $('.getNewData').click(function(){
    var lat1 = $('#latitude1').val();
    var lon1 = $('#longitude1').val();
    var lat2 = $('#latitude2').val();
    var lon2 = $('#longitude2').val();
    var temperatures = 0;

    //for cities http://api.openweathermap.org/data/2.5/box/city?bbox='+lat1+','+lon1+','+lat2+','+lon2+',10&cluster=yes&lang=pl
    $.getJSON('http://api.openweathermap.org/data/2.5/box/station?&bbox='+lon1+
    ','+lat1+','+lon2+','+lat2+',6cluster=yes&format=json&lang=pl',
    function(data) {
      jsonData = data;
      $('p, .data').empty();
      if(jsonData.cnt > 0){
        for(i=0; i<jsonData.cnt; i++){
          temperatures += jsonData.list[i].main.temp;
          $('<tr>').append(
            $('<td>').text(i+1),
            $('<td>').text(jsonData.list[i].name),
            $('<td>').text(jsonData.list[i].main.temp + "C°")
          //  $('<td>').text(jsonData.list[i].weather[0].description)
          ).appendTo('tbody');
        }
        avgTemp = temperatures/jsonData.cnt;
        $('<p>').text("Srednia temperatura na wybranym obszarze wynosi: " +
        avgTemp + "C°").appendTo('.average');
      } else {
        $('<p>').text("Na wybranym obszarze nie ma żadnej stacji"
        ).appendTo('.average');
      }
    });
  });
});
