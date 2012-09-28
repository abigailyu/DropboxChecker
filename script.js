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
		var ok = difference < oneDay;
		
		var filenameElement = document.getElementById("filename");
		if (filenameElement != null)
			filenameElement.innerHTML = filename;
		
		var modifiedElement = document.getElementById("modified");
		if (modifiedElement != null)
			modifiedElement.innerHTML = modified.toString();
		
		var modifiedDays = document.getElementById("modifiedDays");
		if (modifiedDays != null)
			modifiedDays.innerHTML = difference / oneDay;
		
		var messageResult = document.getElementById("result");
		
		if (ok)
		{
			messageResult.innerHTML = "All is OK.";
			filenameElement.className = modifiedElement.className = modifiedDays.className = "okFile";
		}
		else
		{
			messageResult.innerHTML = "Check your backups!";
			filenameElement.className = modifiedElement.className = modifiedDays.className = "badFile";
		}
			
	});
}

client.authenticate(function(error, client) {
  if (error) {
    return alert(error);
  }

  checkBackup(client);
});


