const WebSocket = require('ws');
const TrafficLogic = require('./TrafficLogic/TrafficLogic.js');

const wss = new WebSocket.Server({ port: 8080 });
const traffic = new TrafficLogic;

wss.on('connection', function connection(ws) {

console.log("Connection made");

    ws.on('message', function incoming(data) {
        console.log(data);

        let isJson = 0;
        try  {
            JSON.parse(data)
            isJson = 1;
        } catch(e){
            console.log("Not JSON")
        }

        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                if (isJson === 1){
                    // We got a JSON object

                    let x =  traffic.CreateResponse(data);
                    client.send(x);
                } else{
                    client.send("No comprende JSonerino senor");
                }
                ///client.send('Oh green world');




            }
        });
    });
});

