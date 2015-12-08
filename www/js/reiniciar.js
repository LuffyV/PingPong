//http://stackoverflow.com/questions/6125862/how-to-count-step-using-accelerometer-in-android
document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
}

/*
* El podometro se implementa en saveName() de game.js despues de start(), usar startAccelerometer() despues de start
* Agregar antes reiniciar.js antes de game.js en el index.html agita para ver resultados;
* */

var accelerometerWatchID = null, data;

function startAccelerometer() {
    alert("empieza acelerometro");

    var options = {
        frequency: 750
    };

    accelerometerWatchID = navigator.accelerometer.watchAcceleration(onSuccessPedometer,onErrorPedometer, options);
}

var posicionAnteriorY = 0,
    posicionActualY = 0,
    pocisionAnteriorX = 0,
    pocisionActualX = 0,
    diferenciaPos = .5,
    error = 5.0;
var seMovioX = false, seMovioY = false;


function onSuccessPedometer(acceleration) {


    posicionActualY = acceleration.y;
    pocisionActualX = acceleration.x;

    if (pocisionActualX != (pocisionAnteriorX + diferenciaPos) ||
        pocisionActualX != (pocisionAnteriorX - diferenciaPos))
        seMovioX = true;

    if (seMovioX)
        if (posicionActualY != posicionAnteriorY + diferenciaPos ||
            posicionActualY != posicionAnteriorY - diferenciaPos)
            seMovioY = true;


    if (seMovioX && seMovioY &&
        Math.abs(pocisionActualX - pocisionAnteriorX) > error &&
        Math.abs(posicionActualY - posicionAnteriorY) > error) {

        reiniciarPuntos();
        alert("se acabo el acelerometro");

        seMovioX = false;
        seMovioY = false;
    }
    pocisionAnteriorX = pocisionActualX;
    posicionAnteriorY = posicionActualY;
}


function onErrorPedometer() {
    alert('Error con el accelerator');
}

function stopWatchAccelerometer() {
    if (accelerometerWatchID != null) {
        navigator.accelerometer.clearWatch(accelerometerWatchID);
        accelerometerWatchID = null;;
    }
}

