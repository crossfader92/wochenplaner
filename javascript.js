
var divObj = null;
var hoursToDo = 0;
var hoursDone = 0;
var days = ["barMonday", "barTuesday", "barWednesday", "barThursday", "barFriday"];
function checkInput(){
	var error = false;
	var worktime = document.getElementById("worktime").value;
	var checkInput = worktime.match("[0-9/.,]");

	if (checkInput == null){
		error = true;
	}
	if(worktime < 10 || worktime > 99){
		error = true;
	}
	if(!error){
		document.getElementById("errorWorktime").innerHTML = "";
		hoursToDo = document.getElementById("worktime").value;
		hoursToDo = hoursToDo.replace(",",".");
		return true;
	}else{
		document.getElementById("errorWorktime").innerHTML = "Bitte eine Stundenzahl von 10-99 eingeben!";
		document.getElementById("errorWorktime").style.color = "red";
		return false;
	}
}
function startDrag(objElem){
	if(checkInput()){
		divObj = objElem;
	}
}
function stopDrag(){
	divObj = null;
}
function slide(){
	if(divObj != null){
		// Browserweiche
		IE = document.all&&!window.opera;
		DOM = document.getElementById&&!IE;
		
		var mouseY  = 0;       	// Y-Koordinate der Maus
		var divTop 	= 0			// Y-Koordinate des Div (top)
		mouseY = event.clientY
		divTop = divObj.offsetTop;
		divObj.style.height = mouseY - divTop + 1;	
	}
}
function calcDays(){
	hoursDone = 0;

	for(i=0; i < days.length; i++){
		dayHeight = document.getElementById(days[i]).style.height;
		dayHeight = dayHeight.replace(/px/,"");
		document.getElementById(days[i]).innerHTML = Math.floor(dayHeight/60*100)/100;
		hoursDone = hoursDone + (Math.floor(dayHeight/60*100)/100);
	}
	resetDays();
	stopDrag();
}
function resetDays(){
	var additionalTime = ((hoursToDo-hoursDone) / 4);
	for(j=0; j < days.length; j++){
		//alert(j+"."+days.length);
		if(days[j] != divObj.id){
			var newHeight = Math.floor(document.getElementById(days[j]).offsetHeight + (additionalTime*60));
			//alert(document.getElementById(days[j]).style.height);
			document.getElementById(days[j]).style.height = newHeight;
			document.getElementById(days[j]).innerHTML = Math.floor(newHeight/60*100)/100;
		}
	}
}
