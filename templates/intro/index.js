import { SkynetClient } from 'skynet-js'

const client = new SkynetClient()

// createWebPage is the main function of this Skynet Application. It takes the
// mediaFile and name submitted by the user and generates a new web page
// containing that content.
window.createWebPage = function () {
  // Get all the DOM element and the corresponding values
  var name = document.getElementById('name').value
  var avatar = document.getElementById('avatar').files[0]

  // Create the html file
  const htmlFile = createHTMLFile(name)

  // Establish the directory that will be uploaded. This will contain the
  // avatar image that was uploaded as well as an index.html file to display the
  // content.
  const webDirectory = {
    'index.html': new File([htmlFile], 'index.html', { type: 'text/html' }),
    'avatar.jpg': avatar
  }

  // Upload the directory.
  try {
    (async () => {
      // Uploading the directory will return a skylink. The skylink is prefix
      // with 'sia:' to UX purposes
      const skylink = await client.uploadDirectory(
        webDirectory,
        'webDirectory'
      )
      // For the redirect link we want to trim the 'sia:' prefix so that the
      // link is https://siasky.net/<skylink hash>/
      const directLink = '/' + skylink.replace('sia:', '') + '/'
      document.getElementById('skylink').href = directLink
      document.getElementById('skylink').text = skylink
    })()
  } catch (error) {
    alert(error)
  }
}

// Create the HTML file for the Skynet content.
function createHTMLFile (name) {
  const today = new Date()
  const day = today.getDate()
  const month = today.getMonth() + 1
  const year = today.getFullYear()

  /* eslint-disable */
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Skynet-Generated Webpage</title>
    <style>
      .cert {
        border: 15px solid #0072c6;
        border-right: 15px solid #0894fb;
        border-left: 15px solid #0894fb;
        width: 700px;
        font-family: arial;
        color: #383737;
      }

      .crt_title {
        margin-top: 30px;
        font-family: "Satisfy", cursive;
        font-size: 40px;
        letter-spacing: 1px;
        color: #0060a9;
      }
      .crt_logo img {
        width: 130px;
        height: auto;
        margin: auto;
        padding: 30px;
      }
      .colorGreen {
        color: #27ae60;
      }
      .crt_user {
        display: inline-block;
        width: 80%;
        padding: 5px 25px;
        margin-bottom: 0px;
        padding-bottom: 0px;
        font-family: "Satisfy", cursive;
        font-size: 40px;
        border-bottom: 1px dashed #cecece;
      }

      .afterName {
        font-weight: 100;
        color: #383737;
      }
      .colorGrey {
        color: grey;
      }
      .certSign {
        width: 200px;
      }

      @media (max-width: 700px) {
        .cert {
          width: 100%;
        }
      }
    </style>
    <link
      href="https://fonts.googleapis.com/css?family=Satisfy"
      rel="stylesheet"
    />
  </head>
  <body>
    <table class="cert">
      <tr>
        <td align="center" class="crt_logo">
          <img
            src="https://siasky.net/AAAW-h21PPBfkDsDaL1HwKasKBKc08i6Euz8I_9CLM3eww"
            alt="logo"
          />
        </td>
      </tr>
      <tr>
        <td align="center">
          <h1 class="crt_title">Certificate Of Completion</h1>
          <h2>This Certificate is Awarded to</h2>
          <h1 class="colorGreen crt_user">${name}</h1>
          <h3 class="afterName">
            For their completion of the 'Intro to Skynet workshop'.
          </h3>
          <h3>Awarded on ${month}/${day}/${year}</h3>
        </td>
      </tr>
      <tr>
        <td align="center" class="crt_logo">
          <img src="avatar.jpg" alt="logo" />
        </td>
      </tr>
    </table>
  </body>
</html>
`;
  /* eslint-enable */
}
