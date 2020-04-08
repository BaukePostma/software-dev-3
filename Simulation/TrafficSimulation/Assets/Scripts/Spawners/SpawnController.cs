using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SpawnController : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        targetTime = timeValue;
    }

    public float timeValue = 5.0f;
    public float targetTime = 0.0f;
    
    // Update is called once per frame
    void Update()
    {
        targetTime -= Time.deltaTime;

        if (targetTime <= 0.0f)
        {
            SpawnTraffic();
            targetTime = timeValue;
        }
    }

    private void SpawnTraffic()
    {
        DetectorScript[] detectors = GameObject.Find("Detectors").GetComponentsInChildren<DetectorScript>();

        foreach (var item in detectors)
        {
            if(item.GetAmountOfTraffic() < 5)
            {
                string detectorName = item.gameObject.name;

                CarSpawner[] spawners = GetComponentsInChildren<CarSpawner>();

                foreach (var thing in spawners)
                {
                    string spawnerName = thing.gameObject.name;
                    if (detectorName[0] == spawnerName[0] && detectorName[1] == spawnerName[1] && detectorName[2] == spawnerName[2])
                    {
                        thing.SpawnCar();
                    }
                }


            }
        }
    }
}
