const LightObjectTemplates = require('./LightObjectTemplates.js');
const templates = new LightObjectTemplates;
module.exports =  class TrafficLogic {

    CurrentCycle;
    CurrentTraffic;

    TimeSinceCycle = {0:99999, 1:99999, 2:99999, 3:99999, 4:99999 };
    GreenTime = 8000;
    OrangeTime = 3500;
    ClearanceTime = 6000;
    isLooping = false;


    DebugSelectRandomCycle(){
        let randomnumber = Math.floor(Math.random()*5);

        console.log(randomnumber);
        return LightObjectTemplates.prototype.GetCycle(randomnumber);
    }
    IterateOverLights(lightsObject){

         lightsObject = JSON.parse(lightsObject);
         Object.keys(lightsObject).forEach(function(key){
             console.log("Key:   " + key);
             console.log("Value: " + lightsObject[key]);
         })
    }
    CalculateNextCycle(){

        /*
        Determines what cycle should come next
        If a cycle has bus-priority, that should go first
        Otherwise,  Priority = Time since last cycle * Sum of all traffic for that cycle
        */

        // If there is traffic on a buslane, give that cycle priority
        if(this.CurrentTraffic.BB1 !== 0)
        {
            console.log("BB1 buslane has trafffic");
            let x = templates.GetCycle3();
           // return x;
        }else if (this.CurrentTraffic.AB1 !== 0 || this.CurrentTraffic.AB2 !== 0)
        {
            console.log("AB1 or AB2  buslane has trafffic");
            let x = templates.GetCycle0();
           // return x;
        }

        let priorities = {0:0, 1:0, 2:0, 3:0, 4:0 };
        let trafficSum =  this.GetTrafficSum(this.CurrentTraffic);
        for (let key in priorities){
             priorities[key] = trafficSum[key] * this.TimeSinceCycle[key];
         }
        console.log("-- NEW PRIORITIES --");
        console.log(priorities);
        let priorityCycle ;
        let priorityHighscore = 0;

        // Loop over all possible cycles
        for(let key in priorities){
            if (priorityCycle != null) {
                // IF cycle is higher than current priorityCycle
               if (priorities[key] >= priorityHighscore){
                   console.log("New cycle is higher than " + this.priorityCycle + "New cycle is " + priorities[key]);
                   priorityCycle = key;
                   priorityHighscore = priorities[key];
               }
            }else{
                priorityCycle =key;
                priorityHighscore = priorities[key];
            }
        }
        console.log("PriorityCycle = " + priorityCycle);
        let x = templates.GetCycle(priorityCycle);

        // TODO FIND A BETTER PLACE TO PUT THIS BIT OF CODE
        this.TimeSinceCycle[priorityCycle] =  0;
        console.log("PriorirtyCycle time has beeen set to: " + this.TimeSinceCycle[priorityCycle]);
        return x;
    }

    /*
     Takes a lightObject, returns a lightObject that has turned all the
     greens of the original into orange
     */
    ChangeGreensToOrange(lightstatus){
         try{
             let orangelights =  templates.GetRed();
             for (let [key, value] of Object.entries(lightstatus)){
                 if (value === 2){
                     orangelights[key] = 1;
                 }
             }
             return orangelights;
         } catch{
             console.log("CRAP. Lightstatus in ChangeGreensToOrange is "  + lightstatus)
         }
    }

    /*Count all the cars for every possible cycle
      Returns an object literal 'cycle : traffic'

     */
    GetTrafficSum(trafficstatus){

        let cycle0 = templates.GetCycle0();
        let cycle1 = templates.GetCycle1();
        let cycle2 = templates.GetCycle2();
        let cycle3 = templates.GetCycle3();
        let cycle4 = templates.GetCycle4();

        return {0: this.CalculateTraffic(cycle0, trafficstatus),
                1: this.CalculateTraffic(cycle1, trafficstatus),
                2: this.CalculateTraffic(cycle2, trafficstatus),
                3: this.CalculateTraffic(cycle3, trafficstatus),
                4: this.CalculateTraffic(cycle4, trafficstatus)
        };
    }

    CalculateTraffic(cycle,trafficstatus){
        let sum =0;
        for(let [key, value] of Object.entries(cycle)){
            if (value === 2){
                // If value === 2 , this traffic lane is part of this cycle. Add the traffic of this lane to the sum
                sum = +sum + +trafficstatus[key];
            }
        }
        console.log("--- SUM OF THIS CYCLE  IS EQUAL TO " + sum);
        return sum;
    }

    IncrementTrafficTime(miliseconds){
        for(let key in this.TimeSinceCycle){
            this.TimeSinceCycle[key] =  this.TimeSinceCycle[key] + miliseconds;
        }
    }
};