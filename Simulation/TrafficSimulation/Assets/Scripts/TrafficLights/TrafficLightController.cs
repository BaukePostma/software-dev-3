using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TrafficLightController : MonoBehaviour
{
    // Update is called once per frame
    void Update()
    {
        // remove l8r
        if (Input.GetKeyDown(KeyCode.D))
        {
            Dictionary<string, int> uLights = new Dictionary<string, int>();
            uLights.Add("A1", 1);
            uLights.Add("A2", 1);
            uLights.Add("A3", 1);
            uLights.Add("A4", 1);
            uLights.Add("AB1", 1);
            uLights.Add("AB2", 1);
            uLights.Add("B1", 1);
            uLights.Add("B2", 1);
            uLights.Add("B3", 1);
            uLights.Add("B4", 1);
            uLights.Add("B5", 1);
            uLights.Add("BB1", 1);
            uLights.Add("C1", 1);
            uLights.Add("C2", 1);
            uLights.Add("C3", 1);
            uLights.Add("D1", 1);
            uLights.Add("D2", 1);
            uLights.Add("D3", 1);
            uLights.Add("E1", 1);
            uLights.Add("E2", 1);
            uLights.Add("EV1", 1);
            uLights.Add("EV2", 1);
            uLights.Add("EV3", 1);
            uLights.Add("EV4", 1);
            uLights.Add("FV1", 1);
            uLights.Add("FV2", 1);
            uLights.Add("FV3", 1);
            uLights.Add("FV4", 1);
            uLights.Add("FF1", 1);
            uLights.Add("FF2", 1);
            uLights.Add("GV1", 1);
            uLights.Add("GV2", 1);
            uLights.Add("GV3", 1);
            uLights.Add("GV4", 1);
            uLights.Add("GF1", 1);
            uLights.Add("GF2", 1);
            SetTrafficLightColors(uLights);


        }
    }

    public void SetTrafficLightColors(Dictionary<string, int> updatedLights)
    {
        SetTrafficLight[] trafficLights = GetComponentsInChildren<SetTrafficLight>();

        foreach (SetTrafficLight tlight in trafficLights)
        {
            // get name of current traffic light
            string laneName = "";
            char[] ding = tlight.gameObject.name.ToCharArray();
            foreach (var thing in ding)
            {
                if (thing != ' ')
                {
                    laneName += thing;
                }
                else
                {
                    break;
                }
            }

            // get the correct trafficlightvalue for the lane and parse it to the traffic light so it changes color
            foreach (var light in updatedLights)
            {
                if(light.Key == laneName)
                {
                    tlight.SetToColor(light.Value);
                }
            }
        }
    }
}
