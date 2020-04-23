const WebSocket = require('ws');
const TrafficLogic = require('./TrafficLogic/TrafficLogic.js');
const LightObjectTemplates = require('./TrafficLogic/LightObjectTemplates');


const wss = new WebSocket.Server({ port: 8080 });
const traffic = new TrafficLogic;
const templates = new LightObjectTemplates;

//TODO Reconnect client if disconnect happend
  async function MainDataLoop(traffic, client){


    while(traffic.isLooping){

        if(client.readyState ===  WebSocket.CLOSED){
            console.log('Client is gone')
            traffic.isLooping = false;
            traffic.TimeSinceCycle = {0:99999, 1:99999, 2:99999, 3:99999, 4:99999 };
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

wss.on('connection', function connection(ws) {

    console.log("Connection made");

    if (wss.clients.size>1){
       ws.send("Someone is already connected. This controller cannot support multiple clients. Please wait a minute before reconnecting");
       ws.close();
       console.log('Disconnecting new client');
    }

    ws.on('message', function incoming(data) {
        console.log(data);
        let isJson;
        //Check if the message is JSON
        try  {
            JSON.parse(data);
            isJson = 1;
        } catch(e){
            console.log("Not JSON")
        }

        wss.clients.forEach( function each(client) {

            if (client.readyState === WebSocket.OPEN) {
                if (isJson === 1){
                    traffic.CurrentTraffic = JSON.parse(data);
                    if (!traffic.isLooping){
                        traffic.isLooping = true;
                        MainDataLoop(traffic,client);

                    // todo (Optional  - Check JSOn validity)

                    /*
                    1. Parse the JSOn
                    2. Calculate what  should go first
                    3.    Cycles  Priority = Time since last cycle * Sum of all traffic for that cycle
                    4.
                        Pick a cycle. Send the cycle to the simulation. CurrentCycle = this cycle
                        After GreenTime seconds has passed, loop over currentcycle. set all greens to orange. send this status to simulation
                        Use the latest data from the sim to determine new highest priority cycle.
                        After Orangetime seconds has passed, send red signal
                        After clearance time seconds have passed, send next highest priority cycle
                     */

                } else{
                    client.send("ERROR - Could not parse message as JSON");
                }
            }
        });
    });

    ws.on('close', function close() {
        console.log(  'client disconnected');

    });
});

