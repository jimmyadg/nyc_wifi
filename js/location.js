
var myX=0;
var myY =0;
navigator.geolocation.getCurrentPosition(showPosition, showError);

function showPosition(position){
myX = position.coords.latitude *24544;
myY = Math.abs(position.coords.longitude)*3270;
document.getElementById('loc').innerHTML = "Your location is: " + position.coords.latitude + ", " + position.coords.longitude;
console.log("My position is: " + position.coords.latitude, position.coords.longitude);
console.log("My position is: " + myX, myY);

}


function showError(error){
console.log("ERROR" + error.message);

}




//xRatio
//24544

//yRatio/
//-3,270
