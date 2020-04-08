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
    //public string host = "ws://localhost:8080";
    //public string host = "ws://trafic.azurewebsites.net/simulation";
    public string host = "wss://echo.websocket.org";
    // Start is called before the first frame update
    async void Start()
    {
        

        Debug.Log("Starting!");
        websocket = new WebSocket(host);

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
            //Debug.Log("OnMessage!");
            //Debug.Log(bytes);

            // getting the message as a string
            var message = System.Text.Encoding.UTF8.GetString(bytes);
            Debug.Log("OnMessage! " + message);
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

            // Sending plain 

            //Debug.Log("Sending text to server");

            //GameObject.Find("Detectors").GetComponent<TrafficAmountCounter>().GetTrafficInfo(); // <- gebruik deze 
            //await websocket.SendText(ding.GetTrafficInfo());
            await websocket.SendText("{" +
                "A1:0," +
                "A2:0," +
                "A3:0," +
                "A4:0," +
                "AB1:0," +
                "AB2:0," +
                "B1:0," +
                "B2:0," +
                "B3:0," +
                "B4:0," +
                "B5:0," +
                "BB1:0," +
                "C1:0," +
                "C2:0," +
                "C3:0," +
                "D1:0," +
                "D2:0," +
                "D3:0," +
                "E1:0," +
                "E2:0," +
                "EV1:0," +
                "EV2:0," +
                "EV3:0," +
                "EV4:0," +
                "FF1:0," +
                "FF2:0," +
                "FV1:0," +
                "FV2:0," +
                "FV3:0," +
                "FV4:0," +
                "GF1:0," +
                "GF2:0," +
                "GV1:0," +
                "GV2:0," +
                "GV3:0," +
                "GV4:0" +
                "}");
        }
    }

    private async void OnApplicationQuit()
    {
        await websocket.Close();
    }

    //public async Task Connect(string uri)
    //{
    //    Thread.Sleep(1000);
    //    try
    //    {
    //        socket = new ClientWebSocket();
    //        await socket.ConnectAsync(new System.Uri(uri), CancellationToken.None);
    //        Console.WriteLine("Connected" + socket.State);
    //        // await Task.WhenAll(Receive(socket), Send(socket));

    //        await Send(socket);
    //    }
    //    catch (System.Exception e)
    //    {
    //        System.Console.WriteLine(e);
    //    }
    //    finally {
    //        if (socket!= null)
    //        {
    //            socket.Dispose();
    //        }
    //        System.Console.WriteLine("Closed?");

    //    }
    //}

    //private async Task Send(ClientWebSocket socket)
    //{
    //    while (socket.State == WebSocketState.Open)
    //    {
    //        Console.WriteLine("Write to send to the server");
    //        string stringtoSend = "Hello from Unity";
    //        byte[] buffer = encoding.GetBytes(stringtoSend);

    //        await socket.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Binary, false, CancellationToken.None);
    //        Console.WriteLine("sent: " + stringtoSend);

    //        await Task.Delay(1000);
    //    }
    //}

    //private async Task Receive(ClientWebSocket socket)
    //{
    //    byte[] buffer = new byte[1024];
    //    while(socket.State == WebSocketState.Open)
    //    {
    //        var result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
    //        if (result.MessageType == WebSocketMessageType.Close)
    //        {
    //            await socket.CloseAsync(WebSocketCloseStatus.NormalClosure, string.Empty, CancellationToken.None);
    //        }
    //        else
    //        {
    //            Console.WriteLine("Received:" + Encoding.UTF8.GetString(buffer).TrimEnd('\0'));
    //        }

    //    }
    //}

}
