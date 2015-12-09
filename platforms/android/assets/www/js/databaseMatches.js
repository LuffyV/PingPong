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
                var element = $('<li>'+ item.p1Name + ' ' + item.p1Score + '-' + item.p2Score + ' ' + item.p2Name + '</li>');
                var ul = $('#listSingle');
                ul.append(element);
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
                var element = $('<li>'+ item.p1Name + '/' + item.p2Name + ' ' + item.t1Score + '-' + item.t2Score + ' ' +  item.p3Name + '/' + item.p4Name +'</li>');
                var ul = $('#listDouble');
                ul.append(element);
            }
        }, errorDB);
    }, errorDB);
}