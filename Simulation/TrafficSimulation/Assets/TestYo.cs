using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

public class TestYo : MonoBehaviour
{
    public int speed;
    // Start is called before the first frame update
    void Start()
    {
        
        
    }

    // Update is called once per frame
    void Update()
    {
        if (transform.localPosition.z < -20)
            transform.Translate(Vector3.forward * Math.Abs(Time.deltaTime * speed));
        else if(transform.localPosition.z > 20)
            transform.Translate(Vector3.forward * Time.deltaTime * speed * -1);

    }
}
