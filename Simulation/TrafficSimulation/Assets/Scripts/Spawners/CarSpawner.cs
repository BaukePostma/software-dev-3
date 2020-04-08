using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CarSpawner : MonoBehaviour
{
    public Transform spawnPos;
    public GameObject spawnee;

    public void SpawnCar()
    {
        GameObject thing = Instantiate(spawnee, spawnPos.position, spawnPos.rotation) as GameObject;
        thing.GetComponent<MovementStatus>().SetSpawnLocation(spawnPos);
        thing.GetComponent<MovementStatus>().SetSpawnName(spawnPos.name);
        thing.AddComponent<Movement>();
    }
}
