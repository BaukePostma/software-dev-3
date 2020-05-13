const LightObject = require('./LightObject');

module.exports = class LightObjectTemplates{


    GetRed(){
        return new LightObject;
    }

    GetCycle(cycle) {
        switch (cycle) {
            case "0":
                return this.GetCycle0();
            case "1":
                return this.GetCycle1();
            case "2":
                return this.GetCycle2();
            case "3":
                return this.GetCycle3();
            case "4":
                return this.GetCycle4();
            default:
                console.log("ERRORR");
        }
    }

     GetCycle0(){
        // Geel op de kaart

         // AB1 AB2 kan niet met A4
        let status = new LightObject;
        status.A2 = 2;
        status.A3 = 2;
        status.A4 = 2;
        status.BB1 =2;
        status.B5 = 2;
        status.FV1 = 2;
        status.FV2 = 2;
        status.FV3 = 2;
        status.FV4 = 2;
        status.FF1 = 2;
        status.FF2= 2;

        return status;
    }
     GetCycle1(){
        //Groen op de kaart
        let status = new LightObject;

        status.B4 = 2;
        status.D1 = 2;
        status.D2 = 2;
        status.GF1 = 2;
        status.GF2 =2;
        status.GV2 =2;
        status.GV1 = 2;
        status.GV3 = 2;
        status.GV4 = 2;

        return status;
    }

    GetCycle2(){
        //Cyaan op de kaart

        let status = new LightObject;
        status.C1 = 2;
        status.C2 = 2;
        status.AB2 = 2;
        status.E1 = 2;
        status.EV1 = 2;
        status.EV2 = 2;
        status.EV3= 2;
        status.EV4= 2;

        return status;
    }

    GetCycle3(){
        //Paars op de kaart
        let status = new LightObject;
        status.A1 = 2;
        status.B1 = 2;
        status.C3 = 2;
        status.D3 = 2;

        return status;
    }

    GetCycle4(){
        //Blauw op de kaart
        let status = new LightObject;
        status.AB1 = 2;
        status.B2 =2;
        status.B3 =2;
        status.B5 = 2;
        status.FF1 =2;
        status.FF2 =2;
        status.FV1 = 2;
        status.FV2 = 2;
        status.FV3 = 2;
        status.FV4 = 2;

        return status;
    }
};
