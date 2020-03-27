using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ObjectDestroyer : MonoBehaviour
{


    // Update is called once per frame
    void Update()
    {
        

      
    }

    private void OnCollisionEnter(Collision collision)
    {
        if(collision.gameObject.name == "ObjectDestroyer")
        {
            Destruction();
        }
    }

    void Destruction()
    {
        Destroy(this.gameObject);
    }
}
