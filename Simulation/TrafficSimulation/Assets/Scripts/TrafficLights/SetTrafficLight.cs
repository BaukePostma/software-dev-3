using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SetTrafficLight : MonoBehaviour
{
    private void Start()
    {
        Renderer render = GetComponent<Renderer>();
        render.material.color = Color.red;
    }

    public void SetToColor(int colorCode)
    {
        Renderer render = GetComponent<Renderer>();

        if (colorCode == 0)
        {
            render.material.color = Color.red;
        }
        else if (colorCode == 1)
        {

            render.material.color = Color.yellow;

        }
        else if (colorCode == 2)
        {
            render.material.color = Color.green;
        }

    }
}
