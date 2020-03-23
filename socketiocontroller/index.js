const WebSocket = require('ws');
const TrafficLogic = require('./TrafficLogic/TrafficLogic.js');
const LightObjectTemplates = require('./TrafficLogic/LightObjectTemplates');


const wss = new WebSocket.Server({ port: 8080 });
const traffic = new TrafficLogic;
const templates = new LightObjectTemplates;

 function MainDataLoop(traffic, client){


    while(traffic.isLooping){

        // TODO Async handling of incoming messages


        let x = traffic.CalculateNextCycle();
        traffic.CurrentCycle = traffic.CalculateNextCycle();
        let orange = traffic.ChangeGreensToOrange(traffic.CurrentCycle);

        console.log("SENDING GREEN");
        client.send(JSON.stringify(traffic.CurrentCycle));
       // setTimeout(function(){ client.send(JSON.stringify(traffic.CurrentCycle)) }, traffic.GreenTime);
      //  await sleep(traffic.GreenTime);
        console.log("GREENTIME DONE");

        console.log("SENDING ORANGE");
        client.send(JSON.stringify(orange));
       // await sleep(traffic.OrangeTime);
        console.log("ORANGETIME  DONE");

        console.log("SENDING RED");
        client.send(JSON.stringify(templates.GetRed()));
      //  await sleep(traffic.ClearanceTime);
        console.log("ClearanceTime  DONE");



        // setTimeout(client.send(JSON.stringify(LightObjectTemplates.prototype.GetRed())), traffic.OrangeTime);

        //setTimeout(client.send(JSON.stringify(traffic.CurrentCycle)), traffic.ClearanceTime);

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
                    // TODO Start the loop if not already started, otherwise set the new incoming traffic
                    if (!traffic.isLooping){
                        traffic.isLooping = true;


                        // todo: THIS WORKS NOW 
                        traffic.CurrentCycle = traffic.CalculateNextCycle();

                     //   traffic.CalculateNextCycle(), function(thingy){
                      //      console.log(thingy);
                      //  }


                       // setInterval(MainDataLoop(traffic, client),10000)
                        let cycletime = traffic.GreenTime + traffic.ClearanceTime + traffic.OrangeTime;
                       // setInterval(function(){ alert("Hello"); }, 3000);
                       // setInterval(MainDataLoop(traffic,client),cycletime)
                        //setInterval(() => MainDataLoop(traffic,client), cycletime)



                       // MainDataLoop(traffic, client);
                    }
                    // We got a JSON object
                    // (Optional - Check JSOn validity)

                    /*
                    1. Parse the JSOn
                    2. Calculate what thing should go first
                    3.    Cycles  Priority = Time since last cycle * Sum of all traffic for that cycle
                    4.
                        Pick a cycle. Send the cycle to the simulation. CurrentCycle = this cycle
                        After GreenTime seconds has passed, loop over currentcycle. set all greens to orange. send this status to simulation
                        Use the latest data from the sim to determine new highest priority cycle.
                        After Orangetime seconds has passed, send red signal
                        After clearance time seconds have passed, send next highest priority cycle


                     */






                 //   controller.StartDataLoop();
                    //Send a first, random cycle to the client
                    //let randomCycle = traffic.DebugSelectRandomCycle();
                   // client.send(JSON.stringify(randomCycle));
                   // traffic.CurrentCycle = randomCycle;

                   // client.send(traffic.CreateResponse(data))

                } else{
                    client.send("No comprende JSonerino senor");
                }
            }
        });
    });
});

