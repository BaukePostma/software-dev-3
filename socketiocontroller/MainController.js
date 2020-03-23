const TrafficLogic = require('./TrafficLogic/TrafficLogic.js');
//const LightObject = require('./TrafficLogic/LightObject.js');
const LightObjectTemplates = require('./TrafficLogic/LightObjectTemplates');

//const wss = new WebSocket.Server({ port: 8080 });
const traffic = new TrafficLogic;
const templates = new LightObjectTemplates;

module.exports =  class MainController {

    CurrentTraffic;
    constructor(client) {
        this.client = client;
    }

    isLooping =true;

     StartDataLoop(){
         let p =this.MainDataLoop();
    }
     MainDataLoop(){


        while(this.isLooping){

            // TODO Async handling of incoming messages
            let orange = traffic.ChangeGreensToOrange(traffic.CurrentCycle);

             traffic.NextCycle = traffic.CalculateNextCycle();

            setTimeout(function(){ this.client.send(JSON.stringify(traffic.CurrentCycle)) }, traffic.GreenTime);
            await this.sleep(traffic.GreenTime);
            console.log("GREENTIME DONE");

            setTimeout(function(){ this.client.send(JSON.stringify(orange)) }, traffic.OrangeTime);
            await this.sleep(traffic.OrangeTime);
            console.log("ORANGETIME  DONE");

            setTimeout(function(){ this.client.send(JSON.stringify(templates.GetRed())) }, traffic.ClearanceTime);
            await this.sleep(traffic.ClearanceTime);
            console.log("ClearanceTime  DONE");



            // setTimeout(client.send(JSON.stringify(LightObjectTemplates.prototype.GetRed())), traffic.OrangeTime);

            //setTimeout(client.send(JSON.stringify(traffic.CurrentCycle)), traffic.ClearanceTime);

        }
    }
    StopLooping(){

    }
    sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
}
