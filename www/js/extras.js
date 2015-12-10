var db;

function borrarDB(){
	var confirmacion = confirm("Are you sure? ALL the Players AND Matches will be deleted forever.");
	if(confirmacion == true){
		db = window.openDatabase("pingpong", "1.0", "pingpong", 200000);
	    db.transaction(function(tx){
	        tx.executeSql('DROP TABLE IF EXISTS matchsingle');
	        tx.executeSql('DROP TABLE IF EXISTS matchdouble');
	        tx.executeSql('DROP TABLE IF EXISTS player');
	    }, errorDB);
	    alert("Everything has been successfully deleted");
	    window.location.href = "index.html";
	}
}

function errorDB(err){
    alert("Error processing SQL: " + err.code + ", " + err.message);
}