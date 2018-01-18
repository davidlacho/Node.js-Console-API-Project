getProfile = (username) => {
  console.log(`Connecting to teamTreehouse...`);
  console.log(`Requesting User data for ${username}...`);
  try {
    let requestURL = `https://teamtreehouse.com/${username}.json`
    const https = require('https');
    const request = https.get(requestURL, (res) => {
      const { statusCode } = res;
      if (statusCode === 200) {
        console.log(`Success! Data retrieved for ${username}`);
        let rawData= '';
        res.on('data', (chunk) => {
          rawData += chunk.toString();
        });
        res.on('end', () => {
          console.log('Reading User Data...');
          try {
            const parsedData = JSON.parse(rawData);
            let badgeCount = parsedData.badges.length;
            let points= parsedData.points.JavaScript;
            printMessage(username, badgeCount, points);
          } catch (e) {
            console.error(`Error in JSON parsing: ${e.message}`);
          }
        });
      } else {
        const { statusMessage } = res;
        console.error(`Server responded with error: ${statusCode}: ${statusMessage}`)
        if (statusCode === 404){
          console.error(`User ${username} may not exist, or their profile may be set to private.`);
        }
      }
    }).on('error', (e)=> {
      console.error(`https.get error: ${e.message}`);
    });
  } catch (e) {
    console.error(`Asynchronous error in https request: ${e.message}`);
  }
};

printMessage = (username, badgeCount, points) => {
  console.log(`${username} has ${badgeCount} total badges and ${points} total JavaScript points.`);
}

module.exports.getProfile = getProfile;
