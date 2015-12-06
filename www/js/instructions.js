document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}

function gotFS(fileSystem) {
    filesystem = fileSystem;
    filesystem.root.getFile("how_to_play.txt", {create: true, exclusive: false}, gotFileEntry, fail);
}

function gotFileEntry(fileEntry) {
    fileEntry.createWriter(gotFileWriter, fail);
}

function gotFileWriter(writer) {
    writer.onwrite = function(evt) {
        alert("Write success");
    };
    writer.write("En una partida, el primer jugador en llegar a 11 puntos gana, sin embargo, el juego debe ganarse por un margen de al menos 2 puntos. Cada jugador saca 2 puntos a la vez y luego se cambia de saque.");
}

function fail(error) {
    if(error.code == 1){
        alert('not found');
    }
    alert(error.code);
}