const generateWebPage = (name, imageSkylinkUrl, userID, filePath) => {
  return new File(
    [certificate(name, imageSkylinkUrl, userID, filePath)],
    'index.html',
    {
      type: 'text/html',
    }
  );
};

export default generateWebPage;

const skynetJsUrl =
  'https://siasky.net/_ADEqqK-rWNvj02l7EB67Qef7JEED8_3ITBaK5Iqt5HJ4w';

const certificate = (name, imageSkylinkUrl, userID = '', filePath = '') => {
  // Define date variables
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  // Define sources
  const resources =
    'https://siasky.net/PALEjinbHTTnydodyL370S9koJByTPBIdN5VlANcxfucmA';

  /* eslint-disable */
  return `
<!DOCTYPE html>
<html lang="en" dir="ltr">
	<head>
		<meta charset="utf-8">
		<title>Skynet Certificate</title>
		<meta name="description" content="Certificate">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="${resources}/css/reset.css" type="text/css" />
		<link rel="stylesheet" href="${resources}/css/style.css" type="text/css" />
		<script src="${skynetJsUrl}"></script>
	</head>

	<body>
		<div class="content-container">
			<div class="logo">
				<img src="${resources}/images/skynet-logo.svg" alt="Logo Skynet" />
			</div>
			
			<h1>Certificate Of Completion</h1>
			<div class="ribbon">
				<img src="${resources}/images/ribbon.png" alt="Ribbon" />
			</div>
					
			<h2>This Certificate is Awarded to</h2>
					
			<h3>${name}</h3>
						
			<div class="completion">
				<p>For their completion of the</p>
			</div>
			
			<div class="workshop">
				<p>'Intro to Skynet workshop'</p>
			</div>
						
			<div class="date">
				<span>Awarded on ${month}/${day}/${year}</span>
			</div>
						
			<div class="avatar">
				<img id="certificate-avatar" src="${imageSkylinkUrl}" alt="Avatar">
			</div>
							
			<footer>Sia Skynet 2021, all rights reserved</footer>				
		</div>

		<script>

		function setHoverColor( color ){
			// find avatar and set a boxShadow with our SkyDB color on mouse hover
			document.getElementById("certificate-avatar").onmouseover = function() {
				this.style.boxShadow = "0 0 30px 10px "+color;
			}

			// find avatar and remove boxShadow on mouse exit
			document.getElementById("certificate-avatar").onmouseout = function() {
				this.style.boxShadow = "0 0 0px 0px "+color;
			}
		}

		// Only run this script if we're past step 3 and have a publicKey
		if ("${userID}"){

			// initialize our client
			const client = new skynet.SkynetClient();

			console.log("userid: ${userID}");
			console.log("filePath: ${filePath}");

			// get SkyDB entry, then...
			client.file.getJSON("${userID}", "${filePath}").then( ({data}) => {

				// call function with our SkyDB color
				setHoverColor(data.color);
				console.log(data.color);
			} );
		} else {
			setHoverColor("#57B560");
		}

		</script>


	</body>

</html>
`;
  /* eslint-enable */
};
