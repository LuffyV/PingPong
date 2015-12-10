/**
 * Created by Amitai CS on 08/12/2015.
 */
var db;

document.addEventListener("deviceready", connectionReady, false);


function connectionReady() {
    db = window.openDatabase("pingpong", "1.0", "pingpong", 200000);
    db.transaction(function(tx){
        tx.executeSql('CREATE TABLE IF NOT EXISTS player (id INTEGER PRIMARY KEY AUTOINCREMENT, name, phone, wins, loses, picture)');

    }, errorDB);
    initCamara();
    showPlayers();
}


function errorDB(err){
    alert("Error processing SQL: "+err.code + ", " + err.message);
}

function createPlayer(){
    db.transaction(function(tx){
        var name=$('#name').val();
        var phone=$('#phone').val();
        var image="default_profile_icon.png";
        tx.executeSql('INSERT INTO player (id,name,phone,wins,loses,picture) VALUES (NULL, ?,?,?,?,?)',[name,phone,0,0,image]);

    },errorDB);
    alert("success player");
}

function showPlayers(){
    alert("show Player");

    db.transaction(function(tx){
        tx.executeSql('SELECT * FROM player', [], function(tx,results){
            var size = results.rows.length;
            alert("size: " + size);
            for(var i=0;i<size;i++){
                var item = results.rows.item(i);
                var element = $('<li>'+item.name+'</li>');
                var ul = $('#list');
                ul.append(element);
            }
        }, errorDB);
    }, errorDB);

}
