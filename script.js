const oneDay=1000*60*60*24;
const filenames=["/Backup/sql/ecs_cloud_mysql.sql.gz.gpg", "/Backup/apps/deployment.tar.bz2"];
var tableHTML = "";

const client = new Dropbox.Client({
		key: "omRCGRVEY3A=|puIE7RBXBLNdDzYvWcojIONWT3loQP1rIbny+uaurg==", sandbox: false
});

client.authDriver(new Dropbox.Drivers.Redirect());

function checkBackup(client)
{
	var fileResultsElement = document.getElementById("fileResults");
	if (fileResultsElement != null)
	{
		tableHTML += "<tr><td>Filename</td>\n";
		tableHTML += "<td>Modified</td>\n";
		tableHTML += "<td>Modified Days Ago</td></tr>\n";
		fileResultsElement.innerHTML = tableHTML;
	}
	
	for (var i = 0; i < filenames.length; ++i)
	{
		checkFile(i)	
	}
}

function checkFile(myIndex)
{
	client.stat(filenames[myIndex], function(error, stat, entries) {
		var modified = stat.modifiedAt;
		var now = new Date();
		var difference = now.getTime() - modified.getTime();
		var ok = difference < oneDay;
		
		var cssclass = ok ? "okfile" : "badfile";
		
		var fileResultsElement = document.getElementById("fileResults");
		if (fileResultsElement != null)
		{
			tableHTML += "<tr><td><div id='filename" + myIndex + "' class='" + cssclass + "'></div></td>\n";
			tableHTML += "<td><div id='modified" + myIndex + "' class='" + cssclass + "'></div></td>\n";
			tableHTML += "<td><div id='modifiedDays" + myIndex + "' class='" + cssclass + "'></div></td></tr>\n";
			fileResultsElement.innerHTML = tableHTML;
		}
		
		var filenameElement = document.getElementById("filename" + myIndex);
		if (filenameElement != null)
			filenameElement.innerHTML = filenames[myIndex];
		
		var modifiedElement = document.getElementById("modified" + myIndex);
		if (modifiedElement != null)
			modifiedElement.innerHTML = modified.toString();
		
		var modifiedDays = document.getElementById("modifiedDays" + myIndex);
		if (modifiedDays != null)
			modifiedDays.innerHTML = difference / oneDay;
		
	});
}

client.authenticate(function(error, client) {
  if (error) {
    return alert(error);
  }

  checkBackup(client);
});


