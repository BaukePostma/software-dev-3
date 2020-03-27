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
            await websocket.SendText("message");
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
