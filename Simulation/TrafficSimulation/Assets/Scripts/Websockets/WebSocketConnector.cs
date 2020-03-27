using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using UnityEngine;

using NativeWebSocket;

public class WebSocketConnector : MonoBehaviour
{
    // ClientWebSocket socket;
    // private UTF8Encoding encoding = new UTF8Encoding();

    WebSocket websocket;

    // Start is called before the first frame update
    async void Start()
    {
        Debug.Log("Starting!");
        websocket = new WebSocket("ws://localhost:8080/");

        websocket.OnOpen += () =>
        {
            Debug.Log("Connection open!");
        };

        websocket.OnError += (e) =>
        {
            Debug.Log("Error! " + e);
        };

        websocket.OnClose += (e) =>
        {
            Debug.Log("Connection closed!");
        };

        websocket.OnMessage += (bytes) =>
        {
            Debug.Log("OnMessage!");
            Debug.Log(bytes);

            // getting the message as a string
            // var message = System.Text.Encoding.UTF8.GetString(bytes);
            // Debug.Log("OnMessage! " + message);
        };

        // Connect("ws://localhost:8080").Wait();
        InvokeRepeating("SendWebSocketMessage", 0.0f, 0.3f);
        await websocket.Connect();
    }

    // Update is called once per frame
    void Update()
    {

    }

    async void SendWebSocketMessage()
    {
        if (websocket.State == WebSocketState.Open)
        {
            // Sending bytes
            // await websocket.Send(new byte[] { 10, 20, 30 });

            // Sending plain text
            Debug.Log("Sending text to server");

            TrafficAmountCounter tCounter = new TrafficAmountCounter();

            await websocket.SendText(tCounter.GetTrafficInfo());
            
        }
    }

    private async void OnApplicationQuit()
    {
        await websocket.Close();
    }
}
