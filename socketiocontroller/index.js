const WebSocket = require('ws');

const TrafficLogic = require('./TrafficLogic/TrafficLogic.js');
//const LightObject = require('./TrafficLogic/LightObject.js');
const LightObjectTemplates = require('./TrafficLogic/LightObjectTemplates');

const wss = new WebSocket.Server({ port: 8080 });
const traffic = new TrafficLogic;
const templates = new LightObjectTemplates;

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

                    /*
                    1. Parse the JSOn
                    2. Calculate what thing should go first
                        Cycles
                        Priority = Time since last cycle * Sum of all traffic for that cycle


                     */

                    let yellow = templates.GetA();
                    client.send(JSON.stringify(yellow));


                   // client.send(traffic.CreateResponse(data))

                } else{
                    client.send("No comprende JSonerino senor");
                }



            }
        });
    });
});

