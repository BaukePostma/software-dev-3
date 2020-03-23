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
        let status = new LightObject;
        status.a2 = 2;
        status.a3 = 2;
        status.a4 = 2;
        status.ab1 = 2;
        status.ab2 = 2;
        status.b2 = 2;
        status.b3 = 2;
        status.b4 = 2;

        return status;
    }
     GetCycle1(){
        //Groen op de kaart
        let status = new LightObject;
        status.a1 = 2;
        status.d3 = 2;
        status.e1 = 2;
        status.e2 = 2;
        status.ev1 = 2;
        status.ev2 = 2;
        status.ev3 = 2;
        status.ev4= 2;

        return status;
    }

    GetCycle2(){
        //Cyaan op de kaart
        let status = new LightObject;
        status.c1 = 2;
        status.c2 = 2;
        status.d3 = 2;
        status.e1 = 2;
        status.e2 = 2;
        status.ev1 = 2;
        status.ev2 = 2;
        status.ev3= 2;
        status.ev4= 2;

        return status;
    }

    GetCycle3(){
        //Paars op de kaart
        let status = new LightObject;
        status.bb1 = 2;
        status.c3 = 2;
        status.d1 = 2;
        status.d2 = 2;
        status.gv1 = 2;
        status.gv2 = 2;
        status.gv3 = 2;
        status.gv4= 2;
        status.gf1= 2;
        status.gf2= 2;

        return status;
    }

    GetCycle4(){
        //Blauw op de kaart
        let status = new LightObject;
        status.b1 = 2;
        status.b5 = 2;
        status.c3 = 2;
        status.fv1 = 2;
        status.fv2 = 2;
        status.fv3 = 2;
        status.fv4 = 2;
        status.ff1 = 2;
        status.ff2= 2;

        return status;
    }
}
