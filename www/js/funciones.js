var team1_score;
var team2_score;
var puntosTotales = team1_score + team2_score; // para ir calculando y mostrar a quién le toca sacar
var turnoSaque;
var ultimoPuntoAnotado;
var juegoTerminado;

// ---- EVENTOS ----
function onLoad() {
    alert("Entra al onLoad");
    document.addEventListener("volumeupbutton", onVolumeUpKeyDown, false);
    document.addEventListener("volumedownbutton", onVolumeDownKeyDown, false);
    document.addEventListener("backbutton", onBackKeyDown, false);
    reiniciarPuntos();
    // cargarNombresJugadores();
}

function onVolumeUpKeyDown(){
    if(!juegoTerminado){
        team1_score++;
        document.getElementById("team1_score").innerHTML = team1_score;
        ultimoPuntoAnotado = 1;
        revisarPuntos();
    }
}

function onVolumeDownKeyDown(){
    if(!juegoTerminado){
        team2_score++;
        document.getElementById("team2_score").innerHTML = team2_score;
        ultimoPuntoAnotado = 2;
        revisarPuntos(); 
    }
}

function revisarPuntos(){
    mostrarTurno();
    if(team1_score >= 11 || team2_score >= 11){
        if(Math.abs(team1_score - team2_score) >= 2){
            alert("Se ha terminado el juego");
            juegoTerminado = true;
            mostrarGanador();
        }
    }
}

function mostrarTurno(){
    // que se pinte de rojo el nombre del jugador al que le toca sacar
    // cada 2 puntosTotales todo se pinta de negro y se pinta de rojo el siguiente
}

function mostrarGanador(){
    if(team1_score > team2_score){
        document.getElementById("team1_score").style.color = "green";
        document.getElementById("equipo1").style.backgroundColor = "green";
    } else {
        document.getElementById("team2_score").style.color = "green";
        document.getElementById("equipo2").style.backgroundColor = "green";
    }
}

function onBackKeyDown() {
    if(!juegoTerminado){
        if(ultimoPuntoAnotado == 1 && team1_score > 0){
            team1_score--;
            document.getElementById("team1_score").innerHTML = team1_score;
        }
        if(ultimoPuntoAnotado == 2 && team2_score > 0){
            team2_score--;
            document.getElementById("team2_score").innerHTML = team2_score;
        }
        ultimoPuntoAnotado = 0;
    }
}

function reiniciarPuntos(){
    team1_score = 0;
    team2_score = 0;
    juegoTerminado = false;
    ultimoPuntoAnotado = 0;
	document.getElementById("team1_score").innerHTML = 0;
	document.getElementById("team2_score").innerHTML = 0;
    cargarEstilosDefault();
}

function cargarNombresJugadores(){
    document.getElementById("player1_name").innerHTML = document.getElementById("player1_nameInput").value;
    document.getElementById("player2_name").innerHTML = document.getElementById("player2_nameInput").value;
    document.getElementById("player3_name").innerHTML = document.getElementById("player3_nameInput").value;
    document.getElementById("player4_name").innerHTML = document.getElementById("player4_nameInput").value;
}

function cargarEstilosDefault(){
    document.getElementById("team1_score").style.color = "black";
    document.getElementById("team2_score").style.color = "black";
    document.getElementById("equipo1").style.backgroundColor = "white";
    document.getElementById("equipo2").style.backgroundColor = "white";
}