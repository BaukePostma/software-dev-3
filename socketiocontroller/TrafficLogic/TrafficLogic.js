
const LightObject = require('./LightObject.js');
const LightObjectTemplates = require('./LightObjectTemplates.js');

module.exports =  class TrafficLogic {

     CreateResponse(lightsstatus){
        let traffic = JSON.parse(lightsstatus);
        let response = this.DebugGenerateJsonResponse(traffic);
        console.log(response);

        return response;
    }

    CalculateLights(traffic) {

      // Do some fancy shit on the traffic object to determine the best state

        return Jsonobj;
    }
    //Temporary function. Returns an all red message
    DebugGenerateJsonResponse(traffic){

         let obj  = LightObjectTemplates.prototype.GetA();
         let jsondebugresponse = JSON.stringify(obj);
         return jsondebugresponse;
    }
    IterateOverLights(lightsObject){

         lightsObject = JSON.parse(lightsObject);
         Object.keys(lightsObject).forEach(function(key){
             console.log("Key:   " + key);
             console.log("Value: " + lightsObject[key]);
         })
    }



}