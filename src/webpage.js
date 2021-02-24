// Create the HTML file for the Skynet content.
const WebPage = (name, imageSource) => {
  return new File([certificate(name, imageSource)], "index.html", {
    type: "text/html",
  });
};

const certificate = (name, imageSource) => {
  // Define date variables
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  // Define sources
  const resources =
    "https://siasky.net/PALEjinbHTTnydodyL370S9koJByTPBIdN5VlANcxfucmA";

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
				<img src=${imageSource} alt="Avatar">
			</div>
							
			<footer>Sia Skynet 2021, all rights reserved</footer>				
		</div>
	</body>

</html>
`;
  /* eslint-enable */
};
export { WebPage };
