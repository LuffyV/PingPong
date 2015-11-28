var team1_score;
var team2_score;
var puntosTotales = team1_score + team2_score; // para ir calculando y mostrar a quién le toca sacar
var turnoSaque;
var ultimoPuntoAnotado;
var juegoTerminado;
var numeroJugadores;

$(document).ready(function() {
    $("input[type='radio']").bind("change", function(event, ui) {
        $("input[type='radio']").checkboxradio("refresh");
        var tipoJuego = $("#jugadores :radio:checked").val();
        if(tipoJuego == 4){
            $("#player3_nameInput").show();
            $("#player4_nameInput").show();
        } else {
            $("#player3_nameInput").hide();
            $("#player4_nameInput").hide();
        }
    });
});

// ---- EVENTOS ----
function start() {
    alert("Entra al start");
    document.addEventListener("volumeupbutton", onVolumeUpKeyDown, false);
    document.addEventListener("volumedownbutton", onVolumeDownKeyDown, false);
    document.addEventListener("backbutton", onBackKeyDown, false);
    reiniciarPuntos();
    cargarNombresJugadores();
}

function onVolumeUpKeyDown(){
    if(!juegoTerminado){
        team1_score++;
        if(numeroJugadores == 2){
            document.getElementById("team1_score").innerHTML = team1_score;
        } else {
            document.getElementById("team1_scoreDoubles").innerHTML = team1_score;   
        }
        ultimoPuntoAnotado = 1;
        revisarPuntos();
    }
}

function onVolumeDownKeyDown(){
    if(!juegoTerminado){
        team2_score++;
        if(numeroJugadores == 2){
            document.getElementById("team2_score").innerHTML = team2_score;
        } else {
            document.getElementById("team2_scoreDoubles").innerHTML = team2_score;
        }
        ultimoPuntoAnotado = 2;
        revisarPuntos(); 
    }
}

function onBackKeyDown() {
    if(ultimoPuntoAnotado == 1 && team1_score > 0){
        team1_score--;
        if(numeroJugadores == 2){
            document.getElementById("team1_score").innerHTML = team1_score;
        } else {
            document.getElementById("team1_scoreDoubles").innerHTML = team1_score;
        }
        
    }
    if(ultimoPuntoAnotado == 2 && team2_score > 0){
        team2_score--;
        if(numeroJugadores == 2){
            document.getElementById("team2_score").innerHTML = team2_score;
        } else {
            document.getElementById("team2_scoreDoubles").innerHTML = team1_score;
        }
    }
    ultimoPuntoAnotado = 0;
    juegoTerminado = false;
    cargarEstilosDefault();
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
        if(numeroJugadores == 2){
            document.getElementById("team1_score").style.color = "green";
            document.getElementById("equipo1").style.backgroundColor = "green";
        } else {
            document.getElementById("team1_scoreDoubles").style.color = "green";
            document.getElementById("equipo1").style.backgroundColor = "green";
        }
    } else {
        if(numeroJugadores == 2){
        document.getElementById("team2_score").style.color = "green";
        document.getElementById("equipo2").style.backgroundColor = "green";
        } else {
        document.getElementById("team2_scoreDoubles").style.color = "green";
        document.getElementById("equipo2").style.backgroundColor = "green";            
        }
    }
}

function reiniciarPuntos(){
    team1_score = 0;
    team2_score = 0;
    juegoTerminado = false;
    ultimoPuntoAnotado = 0;
	document.getElementById("team1_score").innerHTML = 0;
	document.getElementById("team2_score").innerHTML = 0;
    document.getElementById("team1_scoreDoubles").innerHTML = 0;
    document.getElementById("team2_scoreDoubles").innerHTML = 0;
    cargarEstilosDefault();
}

function cargarEstilosDefault(){
    document.getElementById("team1_score").style.color = "red";
    document.getElementById("team2_score").style.color = "blue";
    document.getElementById("team1_scoreDoubles").style.color = "red";
    document.getElementById("team2_scoreDoubles").style.color = "blue";

    document.getElementById("equipo1").style.backgroundColor = "red";
    document.getElementById("equipo2").style.backgroundColor = "blue";
}

function cargarNombresJugadores(){
    alert("Entra a cargarNombresJugadores");
    if(numeroJugadores == 2){
        document.getElementById("player1_name").innerHTML = localStorage.player1;
        document.getElementById("player2_name").innerHTML = localStorage.player2;
    }
    if(numeroJugadores == 4){
        document.getElementById("player1_nameDoubles").innerHTML = localStorage.player1;
        document.getElementById("player2_nameDoubles").innerHTML = localStorage.player2;
        document.getElementById("player3_nameDoubles").innerHTML = localStorage.player3;
        document.getElementById("player4_nameDoubles").innerHTML = localStorage.player4;        
    }
}

function saveNames(){
    alert("Entra a saveNames");
    localStorage.player1 = "";
    localStorage.player2 = "";
    localStorage.player3 = "";
    localStorage.player4 = "";

    if($("#player3_nameInput").val() == "" && $("#player4_nameInput").val() == ""){
        localStorage.player1 = $("#player1_nameInput").val();
        localStorage.player2 = $("#player2_nameInput").val();
        numeroJugadores = 2;
        window.location.href = "game.html#GameSingles";
    } else {
        localStorage.player1 = $("#player1_nameInput").val();
        localStorage.player2 = $("#player2_nameInput").val();
        localStorage.player3 = $("#player3_nameInput").val();
        localStorage.player4 = $("#player4_nameInput").val();
        numeroJugadores = 4;
        window.location.href = "game.html#GameDoubles";
    }
    start();
}