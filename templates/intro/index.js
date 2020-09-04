import { SkynetClient, uploadDirectory } from "skynet-js";

const client = new SkynetClient();

window.createMediaPage = function(mainMediaFile) {
	// Establish the page content.
	const pageContent = `
<!doctype html>
<html>
	<head>
		<meta charset=utf-8>
		<title>Skynet-Generated Webpage</title>
    <style>
      h1 {
        font-size: 48px;
        font-weight: 500;
        margin-top: 40px;
        margin-bottom: 10px;
      }
    </style>
  </head>
	<body>
    <center><h1>Check out your Media!</h1></center>
    <img src="media.jpg">
	</body>
</html>
`

	// Establish the index file in the directory.
	const mediaFolder = {
		"index.html": new File([pageContent], "index.html", { type: "text/html"}),
		"media.jpg": mainMediaFile,
	}

	// Upload the media tip as a directory.
	try {
		(async () => {
			const { skylink } = await client.uploadDirectory(mediaFolder, "mediaFolder");
			let directLink = "/"+skylink+"/"
			document.getElementById("mediaLink").href=directLink;
			document.getElementById("mediaLink").text=skylink;
		})();
	} catch (error) {
		alert(error);
	}
}

