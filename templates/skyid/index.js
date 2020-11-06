// Import SkynetClient from the Skynet BrowserJS library
import { SkynetClient } from 'skynet-js'

// Create a Default Skynet client
const client = new SkynetClient()

// uploadAvatar uploads the avatar file to Skynet
window.uploadAvatar = function () {
  // Get avatar file
  var avatar = document.getElementById('avatar').files[0]

  try {
    (async () => {
      // Check if there is a new file selected
      if (avatar) {
        // Upload the avatar image and update the DOM Element with the Skylink
        var link = await client.uploadFile(avatar)
        // Display the Skylink to the User
        const avatarskylink = '/' + link.replace('sia:', '')
        document.getElementById('skylink').href = avatarskylink
        document.getElementById('skylink').text = avatarskylink
      }
    })()
  } catch (error) {
    alert('Skynet Upload Error: ' + error)
  }
}
