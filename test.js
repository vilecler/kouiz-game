const WebSocket = require('ws');
const sockedEndpoint = 'wss://game.kouiz.it';

const ws1 = new WebSocket(sockedEndpoint, {
  perMessageDeflate: false,
  headers: {
    gameSession: "ezaezaezaezaezaezaezaezaez45641s65d4z65d4sq5564843649674648964aezaezaezeza"
  }
});


ws1.on('open', () => {
   console.log('WS1 connected');
   let count = 0;

   setInterval(() => {
     const data = {
       type: 'message',
     }
     const message  = JSON.stringify(data);
     ws1.send(message, (err) => {
       console.log(`WS1 OUT ${message}`);
     })
   }, 15000)
});


ws1.on('message', (data) => {
 console.log('Message received from server: ' + data);
});
