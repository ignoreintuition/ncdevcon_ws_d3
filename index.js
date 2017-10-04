const fs = require('fs')
const WebSocket = require('ws')

const wss = new WebSocket.Server({
  port: 8080
})
var bcData = fs.readFileSync('data/bitcoin.json', 'utf8');
bcData = JSON.parse(bcData)

console.log("Server running on port " + wss.options.port);

wss.on('connection', function connection(ws) {
  var i = 0
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  var intervalID = setInterval(function(){
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(bcData[i]));
      i++
    }
  }, 1000);
});
