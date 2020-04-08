using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DetectOtherEntities : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        RaycastHit hitInfo;
        float range = 3f;
        Vector3 vek = new Vector3(transform.position.x, (transform.position.y + 1), transform.position.z);

        string spawnLoc = GetComponent<MovementStatus>().GetSpawnName();

        if (spawnLoc == "D2 SpawnLoc")
        {
            if (Physics.Raycast(vek, transform.right * -1, out hitInfo, range)) // raycast to the right
            {
                Debug.DrawRay(vek, transform.right * -1, Color.green);
                GetComponent<MovementStatus>().SetEntityAheadTrue();
            }
            else
            {
                Debug.DrawRay(vek, transform.right * -1, Color.red);
                GetComponent<MovementStatus>().SetEntityAheadFalse();
            }
        }

        if (spawnLoc == "C2 SpawnLoc")
        {
            if (Physics.Raycast(vek, transform.right, out hitInfo, range)) // raycast to the right
            {
                Debug.DrawRay(vek, transform.right, Color.green);
                GetComponent<MovementStatus>().SetEntityAheadTrue();
            }
            else
            {
                Debug.DrawRay(vek, transform.right, Color.red);
                GetComponent<MovementStatus>().SetEntityAheadFalse();
            }
        }

        if (spawnLoc == "A2 SpawnLoc" || spawnLoc == "A3 SpawnLoc")
        {
            if (Physics.Raycast(vek, transform.forward * -1, out hitInfo, range)) // raycast to antiforward
            {
                Debug.DrawRay(vek, transform.forward * -1, Color.green);
                GetComponent<MovementStatus>().SetEntityAheadTrue();
            }
            else
            {
                Debug.DrawRay(vek, transform.forward * -1, Color.red);
                GetComponent<MovementStatus>().SetEntityAheadFalse();
            }
        }
            

            if (spawnLoc == "B2 SpawnLoc" || spawnLoc == "B3 SpawnLoc")
        {
            if (Physics.Raycast(vek, transform.forward, out hitInfo, range)) // raycast to forward
            {
                Debug.DrawRay(vek, transform.forward, Color.green);
                GetComponent<MovementStatus>().SetEntityAheadTrue();
            }
            else
            {
                Debug.DrawRay(vek, transform.forward, Color.red);
                GetComponent<MovementStatus>().SetEntityAheadFalse();
            }
        }
        
    }
}
