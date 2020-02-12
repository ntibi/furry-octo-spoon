const http = require("https");

module.exports = (url) => new Promise ((resolve, reject) => {
  http.get(url, (res) => {
    let body = ""
    res.on("data", data => body += data)
    res.on("end", () => resolve(body))
  }).on("error", (err) => reject(err)); 
}); 
