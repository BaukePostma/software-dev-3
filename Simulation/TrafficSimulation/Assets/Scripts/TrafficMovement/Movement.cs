using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Movement : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (GetComponentInParent<MovementStatus>().shouldIStop == false)
        {
            string spawnName = GetComponentInParent<MovementStatus>().GetSpawnName();

            if (spawnName == "A2 SpawnLoc" || spawnName == "A3 SpawnLoc")
            {
                transform.position -= transform.forward * Time.deltaTime * 20;
            }
            else if (spawnName == "B2 SpawnLoc" || spawnName == "B3 SpawnLoc")
            {
                transform.position += transform.forward * Time.deltaTime * 20;
            }
            else if (spawnName == "C2 SpawnLoc")
            {
                transform.position += transform.right * Time.deltaTime * 20;
            }
            else if (spawnName == "D2 SpawnLoc")
            {
                transform.position -= transform.right * Time.deltaTime * 20;
            }

        }
    }
}
