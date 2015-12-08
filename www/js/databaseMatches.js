var db;

document.addEventListener("deviceready", connectionReady, false);

function connectionReady() {
    db = window.openDatabase("pingpong", "1.0", "pingpong", 200000);
    db.transaction(function(tx){
		tx.executeSql('CREATE TABLE IF NOT EXISTS matchsingle(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, p1Name,p2Name,p1Score,p2Score, winner)');
    }, errorDB);

    showMatches();
}

function errorDB(err){
    alert("Error processing SQL: " + err.code + ", " + err.message);
}

function showMatches(){
	alert("showMatches");
    db.transaction(function(tx){
        tx.executeSql('SELECT * FROM matchsingle', [], function(tx,results){
            var size = results.rows.length;
            alert("Size: " + size);
            for(var i=0; i<size; i++){
                var item = results.rows.item(i);
                var element = $('<li>'+ item.p1Name + ' ' + item.p1Score + ' ' + item.p2Score + ' ' + item.p2Name + '</li>');
                var ul = $('#list');
                ul.append(element);
            }
        }, errorDB);
    }, errorDB);
}