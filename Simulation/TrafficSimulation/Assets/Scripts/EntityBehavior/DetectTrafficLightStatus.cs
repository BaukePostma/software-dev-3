using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DetectTrafficLightStatus : MonoBehaviour
{

    // Update is called once per frame
    void Update()
    {
        RaycastHit hitInfo;
        float range = 20f;
        Vector3 vek = new Vector3(transform.position.x, (transform.position.y+1), transform.position.z);


        
        if (Physics.Raycast(vek, transform.up, out hitInfo, range))
        {  
            string objTag = hitInfo.transform.gameObject.tag;
            if (objTag == "Red" || objTag == "Orange")
            {
                GetComponent<MovementStatus>().SetTrafficLightOnTrue();
            }
            else
            {
                GetComponent<MovementStatus>().SetTrafficLightOnFalse();
            }
            
        }        
    }
}
