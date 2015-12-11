/**
 * Created by Amitai CS on 08/12/2015.
 */
var db;

document.addEventListener("deviceready", connectionReady, false);


function connectionReady() {
    db = window.openDatabase("pingpong", "1.0", "pingpong", 200000);
    db.transaction(function(tx){
        tx.executeSql('CREATE TABLE IF NOT EXISTS player (id INTEGER PRIMARY KEY AUTOINCREMENT, name, phone, wins INTEGER, loses INTEGER, picture)');
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
        var image=$('#imagePlayer').attr("src");
        tx.executeSql('INSERT INTO player (id,name,phone,wins,loses,picture) VALUES (NULL, ?,?,?,?,?)',[name,phone,0,0,image]);

    },errorDB);
    alert("Saved player");
window.location.href="players.html";
}

function showPlayers(){
    db.transaction(function(tx){
        tx.executeSql('SELECT * FROM player', [], function(tx,results){
            var size = results.rows.length;
            for(var i=0;i<size;i++){
                var item = results.rows.item(i);
                var element = $('<li class="itemplayer"><a href="" onclick="showPlayer('+item.id+');">   <img class="image" style="width:120px; height 96px" src="'+item.picture+'"> '+item.name+'</a></li>');
                var ul = $('#list');
                ul.append(element);
            }
        }, errorDB);
    }, errorDB);

}

function showPlayer(id){
    db.transaction(function(tx){
        tx.executeSql('SELECT * FROM player where id = ?', [id], function(tx,results){
            var item = results.rows.item(0);
            $('#idSeePlayer').html(item.id);
            $('#namePlayer').html(item.name);
            $('#imgSeePlayer').attr('src',item.picture);
            $('#winsLabel').html(item.wins);
            $('#losesLabel').html(item.loses);
            var winRate=0;
            if(item.wins == 0 ){
                winRate=0;
            } else{
                var total=item.wins+item.loses;
                winRate=parseFloat((item.wins/total)*100).toFixed(2);
            }
            $('#winRate').html(winRate+"%");

        }, errorDB);
    }, errorDB);

    window.location.href="players.html#seePlayer";
}

function deletePlayer(){
    db.transaction(function(tx){
        var idPlayer=$('#idSeePlayer').html();
        tx.executeSql('DELETE FROM player WHERE id = ?', [idPlayer], function(){
            alert("Player Succesfully Deleted");
            window.location.href="players.html";
        }, errorDB);
    }, errorDB);
}