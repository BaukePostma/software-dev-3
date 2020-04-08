using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MovementStatus : MonoBehaviour
{
    public bool shouldIStop = false;
    private bool trafficLightOn = false;
    private bool entityAhead = false;

    private Transform spawnLocation;
    private string spawnName = "";

    

    public void SetTrafficLightOnTrue()
    {
        trafficLightOn = true;
    }

    public void SetTrafficLightOnFalse()
    {
        trafficLightOn = false;
    }

    public void SetEntityAheadTrue()
    {
        entityAhead = true;
    }

    public void SetEntityAheadFalse()
    {
        entityAhead = false;
    }

    public void SetStopStatusToTrue()
    {
        shouldIStop = true;
    }

    public void SetStopStatusToFalse()
    {
        shouldIStop = false;
    }

    public void SetSpawnLocation(Transform loc)
    {
        spawnLocation = loc;
    }

    public Transform GetSpawnLocation()
    {
        return spawnLocation;
    }

    public void SetSpawnName(string name)
    {
        spawnName = name;
    }

    public string GetSpawnName()
    {
        return spawnName;
    }

    void Update()
    {
        if (trafficLightOn != true && entityAhead != true)
        {
            SetStopStatusToFalse();
        }
        else
        {
            SetStopStatusToTrue();
        }
    }
}
