var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;
var tempUnit = 'C';
var currentTempInCelsius;

$(document).ready(function(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      var lat= "lat="+ position.coords.latitude;
      var lon= "lon="+ position.coords.longitude;
      getWeather(lat,lon);
    });
  }
  
  else{
    console.log("Geolocation is not supported by your browser");
  }
  
  $("#tempunit").click(function(){
     var CurrentTempUnit= $("#tempunit").text();
     var CurrentTempValue=$("#tempvalue").text();
     var newTempUnit = (CurrentTempUnit == "C")? "F" : "C";
    $("#tempunit").text(newTempUnit);
    
    if(newTempUnit=="F"){
      var fahTemp = Math.round(parseInt($("#tempvalue").text())*9/5+32);
      $("#tempvalue").text(fahTemp+" "+String.fromCharCode(176) );
    }
    else{
      $("#tempvalue").text(currentTempInCelsius+" "+String.fromCharCode(176) );
    }
  });
  
})

function getWeather(lat,lon){
  var url = api + lat+"&"+lon;
  //alert(url);
  $.ajax({
    url: url, success: function(data){
      $("#area").text(data.name+ ",");
      $("#country").text(data.sys.country);
      currentTempInCelsius = Math.round(data.main.temp*10)/10;
      $("#tempvalue").text(currentTempInCelsius+" "+String.fromCharCode(176));
      $("#tempunit").text(tempUnit);
      $("#tempcond").text(data.weather[0].main);
      IconGen(data.weather[0].main);
    }
  });
}


function IconGen(tempcond){
  var cond = tempcond.toLowerCase();
  switch(cond){
    case 'drizzle':
      addIcon(cond)
      break;
    case 'clouds':
      addIcon(cond)
      break;
    case 'rain':
      addIcon(cond)
      break;
    case 'snow':
      addIcon(cond)
      break;
    case 'clear':
      addIcon(cond)
      break;
    case 'thunderstom':
      addIcon(cond)
      break;
    default:
      $('div.clouds').removeClass('hide');
  }
}

function addIcon(cond){
  $('div.'+cond).removeClass('hide');
}