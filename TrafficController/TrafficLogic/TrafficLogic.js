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

    /**
     Determines what cycle should come next
     Increase the weight of buslanes before calculations
     Priority = Time since last cycle * Sum of all traffic for that cycle
     */
    CalculateNextCycle(){

        // If there is traffic on a buslane, increase that amount to make it count for more
        this.CurrentTraffic.BB1 += this.CurrentTraffic.BB1;
        this.CurrentTraffic.AB1 += this.CurrentTraffic.AB1;
        this.CurrentTraffic.AB2 += this.CurrentTraffic.AB2;

        let priorities = {0:0, 1:0, 2:0, 3:0, 4:0 };
        let trafficSum =  this.GetTrafficSum(this.CurrentTraffic);

        for (let key in priorities){
             priorities[key] = trafficSum[key] * this.TimeSinceCycle[key];
         }
        let priorityCycle ;
        let priorityHighscore = 0;

        // Loop over all possible cycles
        for(let key in priorities){
            if (priorityCycle != null) {
                // IF cycle is higher than current priorityCycle
               if (priorities[key] >= priorityHighscore){
                   priorityCycle = key;
                   priorityHighscore = priorities[key];
               }
            }else{
                priorityCycle =key;
                priorityHighscore = priorities[key];
            }
        }
        // Set the time since this cycle ran to zero.
        this.TimeSinceCycle[priorityCycle] =  0;
        return templates.GetCycle(priorityCycle);
    }

    /**
     Takes a lightObject, returns a lightObject that has turned all the
     green lights of the original into orange lights
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
             console.log("ERROR. Lightstatus in ChangeGreensToOrange is "  + lightstatus)
         }
    }

    /**
     * Count all the cars for every possible cycle
      * Returns an object literal with the format:  'cycle : traffic'
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

    /**
     * Add up all the traffic for a single cycle
     */
    CalculateTraffic(cycle,trafficstatus){
        let sum =0;
        for(let [key, value] of Object.entries(cycle)){
            if (value === 2){
                // If value === 2 , this traffic lane is part of this cycle. Add the traffic of this lane to the sum
                sum = +sum + +trafficstatus[key];
            }
        }
        return sum;
    }

    /**
     *  Increment the time since a cycle has last run.
     */
    IncrementTrafficTime(miliseconds){
        for(let key in this.TimeSinceCycle){
            this.TimeSinceCycle[key] =  this.TimeSinceCycle[key] + miliseconds;
        }
    }
};