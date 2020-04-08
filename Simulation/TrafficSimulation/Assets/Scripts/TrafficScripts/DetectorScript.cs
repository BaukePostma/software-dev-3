using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DetectorScript : MonoBehaviour
{
    private int AmountOfTraffic = 0;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private void OnTriggerEnter(Collider other)
    {
        Renderer render = GetComponent<Renderer>();
        render.material.color = Color.green;

        AmountOfTraffic++;
        //Debug.Log(AmountOfTraffic + " " + this.gameObject.name);
    }

    private void OnTriggerExit(Collider other)
    {
        Renderer render = GetComponent<Renderer>();
        render.material.color = Color.white;

        AmountOfTraffic--;
        //Debug.Log(AmountOfTraffic + " " + this.gameObject.name);
    }

    public int GetAmountOfTraffic()
    {
        return AmountOfTraffic;
    }
}


