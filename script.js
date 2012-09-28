const oneDay=1000*60*60*24;
const filenames=["/Backup/sql/ecs_cloud_mysql.sql.gz.gpg", "/Backup/apps/deployment.tar.bz2"];

const client = new Dropbox.Client({
		key: "omRCGRVEY3A=|puIE7RBXBLNdDzYvWcojIONWT3loQP1rIbny+uaurg==", sandbox: false
});

client.authDriver(new Dropbox.Drivers.Redirect());

function checkBackup(client)
{
	var allOk = true;
	
	for (var i = 0; i < filenames.length; ++i)
	{
		var myIndex = i;
		client.stat(filenames[myIndex], function(error, stat, entries) {
			var modified = stat.modifiedAt;
			var now = new Date();
			var difference = now.getTime() - modified.getTime();
			var ok = difference < oneDay;
			
			var fileResultsElement = document.getElementById("fileResults");
			if (fileResultsElement != null)
			{
				fileResultsElement.innerHTML += "<tr><td>Filename:</td><td><div id='filename" + myIndex + "'></div></td></tr>\n";
				fileResultsElement.innerHTML += "<tr><td>Modified:</td><td><div id='modified" + myIndex + "'></div></td></tr>\n";
				fileResultsElement.innerHTML += "<tr><td>Modified Days Ago:</td><td><div id='modifiedDays" + myIndex + "'></div></td></tr>\n";
			}
			
			var filenameElement = document.getElementById("filename" + myIndex);
			if (filenameElement != null)
				filenameElement.innerHTML = filenames[i];
			
			var modifiedElement = document.getElementById("modified" + myIndex);
			if (modifiedElement != null)
				modifiedElement.innerHTML = modified.toString();
			
			var modifiedDays = document.getElementById("modifiedDays" + myIndex);
			if (modifiedDays != null)
				modifiedDays.innerHTML = difference / oneDay;
			
			if (ok)
			{
				messageResult.innerHTML = "All is OK.";
				filenameElement.className = modifiedElement.className = modifiedDays.className = "okFile";
			}
			else
			{
				messageResult.innerHTML = "Check your backups!";
				filenameElement.className = modifiedElement.className = modifiedDays.className = "badFile";
				allOk = false;
			}
			
		});
	}
		
		var messageResult = document.getElementById("result");
	
		if (allOk)
		{
			messageResult.innerHTML = "All is OK.";
		}
		else
		{
			messageResult.innerHTML = "Check your backups!";
		}
			
	
}

client.authenticate(function(error, client) {
  if (error) {
    return alert(error);
  }

  checkBackup(client);
});


