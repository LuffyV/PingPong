var team1_score = 0;
var team2_score = 0;
var ultimoPunto = 0;

// ---- EVENTOS ----
function onLoad() {
    alert("Entra al onLoad");
    document.addEventListener("volumeupbutton", onVolumeUpKeyDown, false);
    document.addEventListener("volumedownbutton", onVolumeDownKeyDown, false);
    document.addEventListener("backbutton", onBackKeyDown, false);
}

function onVolumeUpKeyDown(){
	alert("Punto para el primer equipo");
    team1_score++;
    document.getElementById("team1_score").innerHTML = team1_score;
    ultimoPunto = 1;
}

function onVolumeDownKeyDown(){
	alert("Punto para el segundo equipo");
	team2_score++;
    document.getElementById("team2_score").innerHTML = team2_score;
    ultimoPunto = 2;
}

function onBackKeyDown() {
    alert("Se apretó el backbutton");
    if(ultimoPunto == 1 && team1_score > 0){
        team1_score--;
        document.getElementById("team1_score").innerHTML = team1_score;
    }
    if(ultimoPunto == 2 && team2_score > 0){
        team2_score--;
        document.getElementById("team2_score").innerHTML = team2_score;
    }
}

function reiniciarPuntos(){
	alert("Se han reiniciado los puntos");
    team1_score = 0;
    team2_score = 0;
	document.getElementById("team1_score").innerHTML = 0;
	document.getElementById("team2_score").innerHTML = 0;
}