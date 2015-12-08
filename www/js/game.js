var team1_score;
var team2_score;
var turnoSaque;
var ultimoPuntoAnotado;
var juegoTerminado;
var numeroJugadores;
var saques = 0;

var ganador;
var db;

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
    document.addEventListener("volumeupbutton", onVolumeUpKeyDown, false);
    document.addEventListener("volumedownbutton", onVolumeDownKeyDown, false);
    document.addEventListener("backbutton", onBackKeyDown, false);
    reiniciarPuntos();
    cargarNombresJugadores();
    connectionReady(); // carga la base de datos de las partidas
    startAccelerometer();
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
            document.getElementById("team2_scoreDoubles").innerHTML = team2_score;
        }
    }
    ultimoPuntoAnotado = 0;
    juegoTerminado = false;
    cargarEstilosDefault();
}

function saveNames(){
    var tipoJuego = $("#jugadores :radio:checked").val();

    if($("#player1_nameInput").val() == ""){
        localStorage.player1 = "P1";
    } else {
        localStorage.player1 = $("#player1_nameInput").val();
    }
    if($("#player2_nameInput").val() == ""){
        localStorage.player2 = "P2";
    } else {
        localStorage.player2 = $("#player2_nameInput").val();
    }    

    if(tipoJuego == 2){
        numeroJugadores = 2;
        window.location.href = "game.html#GameSingles";
    } else {
        // si son 4 jugadores, igual checa p3 y p4
        if($("#player3_nameInput").val() == ""){
            localStorage.player3 = "P3";
        } else {
            localStorage.player3 = $("#player3_nameInput").val();
        }
        if($("#player4_nameInput").val() == ""){
            localStorage.player4 = "P4";
        } else {
            localStorage.player4 = $("#player4_nameInput").val();
        }
        numeroJugadores = 4;
        window.location.href = "game.html#GameDoubles";
    }
    start();
}

function revisarPuntos(){
    if(!juegoTerminado){
        mostrarTurno();
    }
    if(team1_score >= 11 || team2_score >= 11){
        if(Math.abs(team1_score - team2_score) >= 2){
            vibrate();
            playBeep();
            showAlert();

            juegoTerminado = true;
            mostrarGanador();
        }
    }
}

function mostrarTurno(){
    // que se pinte de blanco el nombre del que le toca
    if(numeroJugadores == 2){
        if(saques < 2){
            saques++;
            document.getElementById("player1_name").style.color = "white";
            document.getElementById("player2_name").style.color = "black";
        } else {
            if(saques >= 2){
                saques++;
                document.getElementById("player2_name").style.color = "white";
                document.getElementById("player1_name").style.color = "black";
                if(saques == 4){
                    saques = 0;
                }
            }
        }
    }

    // 1, 4, 2, 3
    if(numeroJugadores == 4){
        if(saques < 2){
            saques++;
            document.getElementById("player1_nameDoubles").style.color = "white";
            document.getElementById("player2_nameDoubles").style.color = "black";
            document.getElementById("player3_nameDoubles").style.color = "black";
            document.getElementById("player4_nameDoubles").style.color = "black";
        } else {
        if(saques >= 2 && saques < 4){
            saques++;
            document.getElementById("player1_nameDoubles").style.color = "black";
            document.getElementById("player2_nameDoubles").style.color = "black";
            document.getElementById("player3_nameDoubles").style.color = "black";
            document.getElementById("player4_nameDoubles").style.color = "white";
        } else {
        if(saques >= 4 && saques < 6){
            saques++;
            document.getElementById("player1_nameDoubles").style.color = "black";
            document.getElementById("player2_nameDoubles").style.color = "white";
            document.getElementById("player3_nameDoubles").style.color = "black";
            document.getElementById("player4_nameDoubles").style.color = "black";
        } else {
        if(saques >= 6){
            saques++;
            document.getElementById("player1_nameDoubles").style.color = "black";
            document.getElementById("player2_nameDoubles").style.color = "black";
            document.getElementById("player3_nameDoubles").style.color = "white";
            document.getElementById("player4_nameDoubles").style.color = "black";
            if(saques == 8){
                saques = 0;
            }
        }            
        }
        }
        }
    }
}

function mostrarGanador(){
    if(team1_score > team2_score){
        if(numeroJugadores == 2){
            document.getElementById("team1_score").style.color = "#009900";
            document.getElementById("equipo1").style.backgroundColor = "#009900";
        } else {
            document.getElementById("team1_scoreDoubles").style.color = "#009900";
            document.getElementById("equipo1Doubles").style.backgroundColor = "#009900";
        }
    } else {
        if(numeroJugadores == 2){
        document.getElementById("team2_score").style.color = "#009900";
        document.getElementById("equipo2").style.backgroundColor = "#009900";
        } else {
        document.getElementById("team2_scoreDoubles").style.color = "#009900";
        document.getElementById("equipo2Doubles").style.backgroundColor = "#009900";            
        }
    }
}

function reiniciarPuntos(){
    team1_score = 0;
    team2_score = 0;
    juegoTerminado = false;
    ultimoPuntoAnotado = 0;
    saques = 0;
	document.getElementById("team1_score").innerHTML = 0;
	document.getElementById("team2_score").innerHTML = 0;
    document.getElementById("team1_scoreDoubles").innerHTML = 0;
    document.getElementById("team2_scoreDoubles").innerHTML = 0;
    mostrarTurno();
    cargarEstilosDefault();
}

function cargarEstilosDefault(){
    document.getElementById("team1_score").style.color = "#cc0000";
    document.getElementById("team2_score").style.color = "#6699ff";
    document.getElementById("team1_scoreDoubles").style.color = "#cc0000";
    document.getElementById("team2_scoreDoubles").style.color = "#6699ff";

    document.getElementById("equipo1").style.backgroundColor = "#cc0000";
    document.getElementById("equipo2").style.backgroundColor = "#6699ff";
    document.getElementById("equipo1Doubles").style.backgroundColor = "#cc0000";
    document.getElementById("equipo2Doubles").style.backgroundColor = "#6699ff";
}

function cargarNombresJugadores(){
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

function saveSingles(){
    if(juegoTerminado){
        if(team1_score > team2_score){
            ganador = localStorage.player1;
        } else {
            ganador = localStorage.player2;
        }
        db = window.openDatabase("pingpong", "1.0", "pingpong", 200000);
        db.transaction(function(tx){
            tx.executeSql('INSERT INTO matchsingle (id,p1Name,p2Name,p1Score,p2Score,winner) VALUES (NULL,?,?,?,?,?)',[localStorage.player1, localStorage.player2, team1_score, team2_score,ganador]);
        }, errorDB);
        alert("Success. Se ha agregado el juego de singles");
    } else {
        alert("El juego aún no termina!");
    }
}

function saveDoubles(){
    if(juegoTerminado){

    } else {
        alert("El juego aún no termina!");
    }
}

function errorDB(err){
    alert("Error processing SQL: " + err.code + ", " + err.message);
}

function alertDismissed() {
    // do something
}

// Show a custom alert
//
function showAlert() {
    navigator.notification.alert(
        'Se ha terminado el juego!',  // message
        alertDismissed,         // callback
        'Game Over',            // title
        'Done'                  // buttonName
    );
}

// Beep two times
//
function playBeep() {
    navigator.notification.beep(2);
}

    // Vibrate for 2 seconds
    //
function vibrate() {
    navigator.notification.vibrate(1000);
}

function connectionReady() {
    alert("connectionReady");
    db = window.openDatabase("pingpong", "1.0", "pingpong", 200000);
    db.transaction(function(tx){
        tx.executeSql('CREATE TABLE IF NOT EXISTS matchsingle(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, p1Name,p2Name,p1Score,p2Score,winner)');
    }, errorDB);
}

function errorDB(err){
    alert("Error processing SQL: " + err.code + ", " + err.message);
}