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
		tableHTML += "<td>Size</td>\n";
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
			tableHTML += "<tr><td><div id='filename" + myIndex + "' class='" + cssclass + "'>" + filenames[myIndex] + "</div></td>\n";
			tableHTML += "<td><div id='size" + myIndex + "' class='" + cssclass + "'>" + stat.humanSize + "</div></td>\n";
			tableHTML += "<td><div id='modified" + myIndex + "' class='" + cssclass + "'>" + modified.toString() + "</div></td>\n";			
			tableHTML += "<td><div id='modifiedDays" + myIndex + "' class='" + cssclass + "'>" + (Math.round(difference / oneDay * 100)/100) + "</div></td></tr>\n";
			fileResultsElement.innerHTML = tableHTML;
		}
	});
}

client.authenticate(function(error, client) {
  if (error) {
    return alert(error);
  }

  checkBackup(client);
});


