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
        
        CarSpawner[] spawners = GetComponentsInChildren<CarSpawner>();

        foreach (var thing in spawners)
        {
            thing.SpawnCar();
            Debug.Log("once");
        }


    }
}
