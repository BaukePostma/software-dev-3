using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TrafficAmountCounter : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        ConvertToJson(GetTrafficAmountsPerLane());
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public string GetTrafficInfo()
    {
        return ConvertToJson(GetTrafficAmountsPerLane());
    }

    private Dictionary<string, int> GetTrafficAmountsPerLane()
    {
        DetectorScript[] detectors = GetComponentsInChildren<DetectorScript>();
        Dictionary<string, int> trafficAmounts = new Dictionary<string, int>();

        foreach (DetectorScript detector in detectors)
        {
            Debug.Log(detector.GetAmountOfTraffic() + " " + detector.gameObject.name);

            string laneName = "";
            char[] ding = detector.gameObject.name.ToCharArray();
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
            trafficAmounts.Add(laneName, detector.GetAmountOfTraffic());
        }
        
        return trafficAmounts;
    }

    private string ConvertToJson(Dictionary<string, int> LaneAndAmount)
    {
        string jsonString = "{";
        foreach(var element in LaneAndAmount)
        {
            jsonString += element.Key + ": " + element.Value + ", ";
        }
        int b = jsonString.Length;
        jsonString = jsonString.Remove(jsonString.Length - 2); // om den laatschte komma te verwijderen
        jsonString += "}";
        Debug.Log(jsonString);
        return jsonString;
        //var jsonObj = Newtonsoft.Json.JsonConvert.DeserializeObject(jsonString);
        //Console.WriteLine(jsonObj);


    }
}
