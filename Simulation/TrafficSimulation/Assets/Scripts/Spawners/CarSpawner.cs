using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CarSpawner : MonoBehaviour
{
    public Transform spawnPos;
    public GameObject spawnee;

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            GameObject thing = Instantiate(spawnee, spawnPos.position, spawnPos.rotation) as GameObject;
            thing.AddComponent < MoveStraightAhead >();
        }
    }

    public void SpawnCar()
    {
        GameObject thing = Instantiate(spawnee, spawnPos.position, spawnPos.rotation) as GameObject;
        thing.AddComponent<MoveStraightAhead>();
    }
}
