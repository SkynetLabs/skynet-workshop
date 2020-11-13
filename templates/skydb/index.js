// Import SkynetClient and keyPairFromSeed from the Skynet BrowserJS library
import { SkynetClient, genKeyPairFromSeed } from 'skynet-js'

// Create a Default Skynet client
const client = new SkynetClient()

// dbEntryName will be the name for the SkyDB entry
const dbEntryName = 'profile'

// setProfile uploads the profile info to SkyDB
window.setProfile = function () {
  // Get the privateKey from the seed
  var seed = document.getElementById('seed').value
  const { privateKey } = genKeyPairFromSeed(seed)

  // Get all the DOM element and the corresponding values
  var name = document.getElementById('name').value
  var email = document.getElementById('email').value
  var bio = document.getElementById('bio').value
  var avatar = document.getElementById('avatar').files[0]

  try {
    // Upload the avatar image to get a skylink to save in SkyDB
    (async () => {
      var avatarskylink = ''
      if (avatar) {
        var link = await client.uploadFile(avatar)
        // Display the Skylink to the User
        avatarskylink = '/' + link.replace('sia:', '')
        document.getElementById('skylink').href = avatarskylink
        document.getElementById('skylink').text = avatarskylink
      } else {
        avatarskylink = document.getElementById('skylink').text
      }

      try {
        // Upload Profile Info to SkyDB
        (async () => {
          await client.db.setJSON(privateKey, dbEntryName, {
            name,
            email,
            avatarskylink,
            bio
          })
          alert('Successfully Uploaded!')
        })()
      } catch (error) {
        alert('SkyDB Error: ' + error)
      }
    })()
  } catch (error) {
    alert('Skynet Upload Error: ' + error)
  }
}

// getProfile gets the profile information from SkyDB
window.getProfile = function () {
  try {
    (async () => {
      // Get the public key from the seed
      var seed = document.getElementById('seed').value
      const { publicKey } = genKeyPairFromSeed(seed)

      // Get the SkyDB entry
      const entry = await client.db.getJSON(publicKey, dbEntryName)

      if (entry) {
        // Grab all the DOM Elements
        var name = document.getElementById('name')
        var email = document.getElementById('email')
        var bio = document.getElementById('bio')
        var fileSelecter = document.getElementById('file-selected')
        var avatarlink = document.getElementById('skylink')

        // Update DOM Elements with profile information
        name.value = entry.data.name
        email.value = entry.data.email
        bio.value = entry.data.bio
        avatarlink.text = entry.data.avatarskylink
        avatarlink.href = entry.data.avatarskylink
        fileSelecter.textContent = ''
      }
    })()
  } catch (error) {
    alert('Error Getting SkyDB Entry: ' + error)
  }
}
