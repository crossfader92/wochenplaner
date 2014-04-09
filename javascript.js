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
		document.getElementById("errorWorktime").style.color = "#c0392b";
		return false;
	}
}
function switchLock(selDay){
	if(document.getElementById(selDay).style.backgroundColor == 'rgb(192, 57, 43)'){
		document.getElementById(selDay).style.backgroundColor = '#3498db';
	}else{
		document.getElementById(selDay).style.backgroundColor = '#c0392b';
	}
}
function startDrag(objElem){
	if(checkInput()){
		divObj = objElem;
	}
}
function stopDrag(){
	divObj.style.height = divObj.innerHTML * 60;
	divObj = null;
}
function slide(evt){
	if(divObj != null){		
		var mouseY  = 0;       	// Y-Koordinate der Maus
		var divTop 	= 0;		// Y-Koordinate des Div (top)
		mouseY = evt.clientY;
		divTop = divObj.offsetTop;
		divObj.style.height = mouseY - divTop + 1;
		calcDays();
		divObj.innerHTML = Math.floor((mouseY - divTop)/60*10)/10;
	}
}
function calcDays(){
	for(i=0; i < days.length; i++){
		dayHeight = document.getElementById(days[i]).style.height;
		dayHeight = dayHeight.replace(/px/,"");
		document.getElementById(days[i]).innerHTML = Math.floor(dayHeight/60*100)/100;
		if (i == days.length-1){
		var totalHours = 0;
			for(i=0; i < days.length; i++){
			totalHours += document.getElementById(days[i]).style.height;
			}
		if (totalHours/60 < document.getElementById("worktime").value)
			document.getElementById(days[days.length-1]).style.height += 0.1*6; //0.1 Rundungsfehler behoben (https://github.com/crossfader92/wochenplaner/issues/2)
		}
	}
	
	resetDays();
}
function getAmmountOfLockedDays(){
	i=0;
	for(j=0; j < days.length; j++){
		if(document.getElementById(days[j]).style.backgroundColor == 'rgb(192, 57, 43)'){

			i++;
		}
	}
	if(divObj.style.backgroundColor == 'rgb(192, 57, 43)'){
		i--;
	}
	return i;
}
function resetDays(){
	hoursDone = 0;
	for(j=0; j < days.length; j++){
		if(days[j] == divObj.id || document.getElementById(days[j]).style.backgroundColor == 'rgb(192, 57, 43)'){
			hoursDone = (hoursDone)+parseFloat(document.getElementById(days[j]).innerHTML);
		}
	}

	var ammountOfLockedDays = getAmmountOfLockedDays();
	var additionalTime = ((hoursToDo-hoursDone) / (4-ammountOfLockedDays));
	console.log((hoursToDo-hoursDone) +"/"+ (4-ammountOfLockedDays));
	console.log("additionalTime:"+additionalTime);
	for(j=0; j < days.length; j++){
		if(days[j] != divObj.id && document.getElementById(days[j]).style.backgroundColor != 'rgb(192, 57, 43)'){
			
			var newHeight = additionalTime*60
			
			document.getElementById(days[j]).style.height = newHeight;
			document.getElementById(days[j]).innerHTML = Math.round(additionalTime*10)/10;
		}
	}
}
