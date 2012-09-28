const oneDay=1000*60*60*24;
const filename="/Backup/sql/ecs_cloud_mysql.sql.gz.gpg"

const client = new Dropbox.Client({
		key: "omRCGRVEY3A=|puIE7RBXBLNdDzYvWcojIONWT3loQP1rIbny+uaurg==", sandbox: false
});

client.authDriver(new Dropbox.Drivers.Redirect());

function checkBackup(client)
{
	client.stat(filename, function(error, stat, entries) {
		var modified = stat.modifiedAt;
		var now = new Date();
		var difference = now.getTime() - modified.getTime();
		
		document.getElementById("filename").innerHTML = filename;
		document.getElementById("modified").innerHTML = modified.toString();
		document.getElementById("modifiedDays").innerHTML = difference / oneDay;
		var messageResult = document.getElementById("result");
		
		if (difference > oneDay)
			messageResult.innerHTML = "Check your backups!";
		else
			messageResult.innerHTML = "All is OK.";
	});
}

client.authenticate(function(error, client) {
  if (error) {
    return alert(error);
  }

  checkBackup(client);
});


