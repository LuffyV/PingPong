var db;

document.addEventListener("deviceready", connectionReady, false);

function connectionReady() {
    db = window.openDatabase("pingpong", "1.0", "pingpong", 200000);
    db.transaction(function(tx){
        tx.executeSql('CREATE TABLE IF NOT EXISTS matchsingle(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, p1Name,p2Name,p1Score,p2Score, winner)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS matchdouble(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, p1Name,p2Name,p3Name,p4Name,t1Score,t2Score, winner1,winner2)');
    }, errorDB);

    showSingleMatches();
    showDoubleMatches();
}

function errorDB(err){
    alert("Error processing SQL: " + err.code + ", " + err.message);
}

function showSingleMatches(){
    db.transaction(function(tx){
        tx.executeSql('SELECT * FROM matchsingle', [], function(tx,results){
            var size = results.rows.length;
            for(var i=0; i<size; i++){
                var item = results.rows.item(i);
                var element = $('<tr><th>'+item.p1Name+'</th><th>'+ item.p1Score+' - '+item.p2Score+'</th><th>'+item.p2Name+'</th></tr>');
                var table = $('#listSingle');
                table.append(element);
            }
        }, errorDB);
    }, errorDB);
}

function showDoubleMatches(){
    db.transaction(function(tx){
        tx.executeSql('SELECT * FROM matchdouble', [], function(tx,results){
            var size = results.rows.length;
            for(var i=0; i<size; i++){
                var item = results.rows.item(i);
                var element = $('<tr><th><li>'+item.p1Name+'</li><li>'+item.p2Name +'</li></th><th>'+item.t1Score+' - '+item.t2Score + '</th><th><li>' + item.p3Name+'</li><li>'+item.p4Name +'</li></th></tr>');
                var table = $('#listDouble');
                table.append(element);
            }
        }, errorDB);
    }, errorDB);
}