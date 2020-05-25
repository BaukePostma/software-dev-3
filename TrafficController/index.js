const WebSocket = require('ws');
const TrafficLogic = require('./TrafficLogic/TrafficLogic.js');
const LightObjectTemplates = require('./TrafficLogic/LightObjectTemplates');


const wss = new WebSocket.Server({ port: 8080 });
const traffic = new TrafficLogic;
const templates = new LightObjectTemplates;

/**
 * Entry point for the program. Run this file with Node with the command 'node index.js' in the prompt.
 *
 */

/**
 * Main loop that starts once a client has connected.
 */
  async function MainDataLoop(traffic, client){

    while(traffic.isLooping){

        if(client.readyState ===  WebSocket.CLOSED){
            console.log('Client is gone. Restarting');
            traffic.isLooping = false;
            traffic.TimeSinceCycle = {0:99999, 1:99999, 2:99999, 3:99999, 4:99999 };
            traffic.CurrentCycle = undefined;
            traffic.CurrentTraffic = undefined;
            return;
        }

        console.log("Old CurrentCycle: " + traffic.CurrentCycle);
        traffic.CurrentCycle = traffic.CalculateNextCycle();
        console.log("New CurrentCycle: " + traffic.CurrentCycle);

        let orange;
        try{
            orange = traffic.ChangeGreensToOrange(traffic.CurrentCycle);
        }
        catch{
            console.log("ERROR. ORANGE IS "  + orange)
        }

        console.log("SENDING GREEN");
        client.send(JSON.stringify(traffic.CurrentCycle));
        await sleep(traffic.GreenTime);
        console.log("GREENTIME DONE");

        console.log("SENDING ORANGE");
        client.send(JSON.stringify(orange));
        await sleep(traffic.OrangeTime);
        console.log("ORANGETIME  DONE");

        console.log("SENDING RED");
        client.send(JSON.stringify(templates.GetRed()));
        await sleep(traffic.ClearanceTime);
        console.log("ClearanceTime  DONE");

        traffic.IncrementTrafficTime(traffic.ClearanceTime + traffic.OrangeTime + traffic.ClearanceTime);
        console.log(traffic.TimeSinceCycle);
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

/**
 *  On connecct event handler
 */
wss.on('connection', function connection(ws) {

    console.log("Connection made");

    if (wss.clients.size>1){
       ws.send("Someone is already connected. This controller cannot support multiple clients. Please wait a minute before reconnecting");
       ws.close();
       console.log('Disconnecting new client');
    }

    // On message event handler
    ws.on('message', function incoming(data) {
        console.log("Incoming message: " + data);
        let isJson;
        //Check if the message is JSON
        try  {
            traffic.CurrentTraffic  =JSON.parse(data);
            isJson = 1;
        } catch(e){
            console.log("Not JSON")
        }

        wss.clients.forEach( function each(client) {

            if (client.readyState === WebSocket.OPEN &&  isJson === 1) {
                if (!traffic.isLooping) {
                    traffic.isLooping = true;
                    MainDataLoop(traffic, client);
                } else{
                   // client.send("ERROR - There is already a loop in progress");
                }
            }
        });
    });

    /**
     * On disconnect event handler
     */
    ws.on('close', function close() {
        console.log( 'client disconnected');

    });
});

