// Get token
function getFBToken() {
  return new Promise((resolve, reject) => {
    resolve('6628568379%7Cc1e620fa708a1d5696fb991c1bde5662')
  })
}


function getCurrentUsername(link) {
  return new Promise((resolve, reject) => {
    const test = new URL(link)
    // https://facebook.com/friends/suggestions/?profile_id=xxxxxxxxxxxxxxx
    if (test.pathname.includes('/friends/')) {
      resolve(test.searchParams.get('profile_id'))
    }
    // https://www.facebook.com/groups/xxxxxxxxxxxxxxxx/user/xxxxxxxxxxxxxxx/
    else if (test.pathname.includes('/groups/')) {
      resolve(test.pathname.split('/').filter(str => str != '')[3])
    } else if (test.pathname === '/profile.php') {
      resolve(test.searchParams.get('id'))
    } else {
      resolve(test.pathname)
    }
  })
}

// Get profile id
function getUserID(username) {
  return new Promise((resolve, reject) => {
    fetch('https://mbasic.facebook.com/' + username)
    .then(response => {
      return response.text()
    })
    .then(html => {
      const regex = /owner_id=([a-z0-9\-]+)\&?/i
      var regex_res = html.match(regex)
      if (regex_res) {
          resolve(regex_res[1])
        } else {
          alert('Không thể lấy ảnh đại diện')
          reject(new Error(`Không thể lấy ảnh đại diện`))
        }
      })
      .catch(err => {
        alert('Không thể lấy ảnh đại diện')
        reject(new Error(`Không thể lấy ảnh đại diện`))
      })
    })
  }
  
  // Get avatar
  function openFBAvt(id) {
    getFBToken() // Get user access token
    .then(access_token => {
      window.open(`https://graph.facebook.com/${id}/picture?width=5000&access_token=${access_token}`)
    })
  }
  
  // Get avatar from URL
  function getFBAvt(url) {
    getCurrentUsername(url).then(getUserID).then(openFBAvt)
  }