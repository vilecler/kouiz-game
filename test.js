const WebSocket = require('ws');
const sockedEndpoint = 'wss://game.kouiz.it';

const ws1 = new WebSocket(sockedEndpoint, {
 perMessageDeflate: false
});


ws1.on('test', (message) => {
  console.log('Message received from server: ' + message);
});

ws1.on('open', () => {
   console.log('WS1 connected');
   let count = 0;
   setInterval(() => {
     const data = {
       type: 'message',
       message: `count is ${count}`,
       topic: 'general'
     }
     const message  = JSON.stringify(data);
     ws1.send(message, (err) => {
       if(err) {
         console.log(`Error occurred while send data ${err.message}`)
       }
       console.log(`WS1 OUT ${message}`);
     })
     count++;
   }, 15000)
});
