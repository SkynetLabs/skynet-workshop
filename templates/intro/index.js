import { SkynetClient } from 'skynet-js'

const client = new SkynetClient()

window.createMediaPage = function (mainMediaFile) {
  // Establish the page content.
  /* eslint-disable */
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
`;
  /* eslint-enable */

  // Establish the index file in the directory.
  const mediaFolder = {
    'index.html': new File([pageContent], 'index.html', { type: 'text/html' }),
    'media.jpg': mainMediaFile
  }

  // Upload the media tip as a directory.
  try {
    (async () => {
      // Uploading the directory will return a skylink. The skylink is prefix
      // with 'sia:' to UX purposes
      const skylink = await client.uploadDirectory(mediaFolder, 'mediaFolder')
      // For the redirect link we want to trim the 'sia:' prefix so that the
      // link is https://siasky.net/<skylink hash>/
      const directLink = '/' + skylink.replace('sia:', '') + '/'
      document.getElementById('mediaLink').href = directLink
      document.getElementById('mediaLink').text = skylink
    })()
  } catch (error) {
    alert(error)
  }
}
