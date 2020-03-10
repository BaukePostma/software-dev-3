module.exports =  class TrafficLogic{
// Class responsible for calculating traffic lights


     CreateResponse(lightsstatus){
        let traffic = JSON.parse(lightsstatus);
        let response = this.DebugGenerateJsonResponse(traffic);

        console.log(response);
        return response;
    }

    CalculateLights(traffic) {

      // Do some fancy shit on the traffic object to determine the best state
        let obj = { Name:"John" , age:30};

        let Jsonobj = JSON.stringify(obj);
        console.log(Jsonobj);
        return Jsonobj;
    }
    DebugGenerateJsonResponse(traffic){
        let debugresponse = {
            a1:0,
            a2:0,
            a3:0,
            a4:0,
            ab1:0,
            ab2:0
        }

        let jsondebugresponse = JSON.stringify(debugresponse);
        return jsondebugresponse;
    }



}