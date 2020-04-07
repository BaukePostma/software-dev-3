const WebSocket = require('ws');
const TrafficLogic = require('./TrafficLogic/TrafficLogic.js');
const LightObjectTemplates = require('./TrafficLogic/LightObjectTemplates');


const wss = new WebSocket.Server({ port: 8080 });
const traffic = new TrafficLogic;
const templates = new LightObjectTemplates;

//TODO Reconnect client if disconnect happend
  async function MainDataLoop(traffic, client){


    while(traffic.isLooping){

        traffic.CurrentCycle = traffic.CalculateNextCycle();

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
                        let cycletime = traffic.GreenTime + traffic.ClearanceTime + traffic.OrangeTime;
                        console.log("FIRST TIME LOOPING. ISLOOPING IS " + traffic.isLooping);

                    }else{
                        console.log("NOT THE FIRST TIME LOOPING. ISLOOPING IS " + traffic.isLooping );

                    }
                    // (Optional todo - Check JSOn validity)

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
});

