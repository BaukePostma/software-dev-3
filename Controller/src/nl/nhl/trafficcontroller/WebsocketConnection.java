package nl.nhl.trafficcontroller;


import org.json.JSONException;
import org.json.JSONObject;

import javax.websocket.server.ServerEndpoint;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.OnError;
import javax.websocket.PongMessage;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.nio.ByteBuffer;
import java.util.UUID;

@ServerEndpoint(value="/endpoint}")
public class WebsocketConnection {
    ServerSocket server;
    Socket client;

    @OnOpen
    public void onOpen(Session session) throws IOException {
        // Get session and WebSocket connection
        System.out.println("onOpen::" + session.getId());
    }

    @OnMessage
    public void onMessage(Session session, String message) throws IOException {
        // Handle new messages
        System.out.println("onMessage::From=" + session.getId() + " Message=" + message);
    }

    @OnClose
    public void onClose(Session session) throws IOException {
        // WebSocket connection closes
        System.out.println("onClose::" +  session.getId());
    }

    @OnError
    public void onError(Session session, Throwable t) {
        // Do error handling here
        System.out.println("onError::" + t.getMessage());
    }

    public  void main(String[] args) throws IOException, NoSuchAlgorithmException {
        ServerSocket server = new ServerSocket(80);

            System.out.println("Server has started on 127.0.0.1:80.\r\nWaiting for a connection...");
            Socket client = server.accept();
            System.out.println("A client connected.");

    }


}

   /*
      public void TestConnection()throws IOException, NoSuchAlgorithmException{
        server = new ServerSocket(80);

        System.out.println("Server has started on 127.0.0.1:80.\r\nWaiting for a connection...");
        client = server.accept();
        System.out.println("A client connected.");
    }
    public void TestSendJSON()throws IOException, NoSuchAlgorithmException{
        System.out.println("TestSendJSON called");
        JSONObject json = new JSONObject();
        json.put("Name" , "Spaghetti");

        InputStream in = client.getInputStream();
        OutputStream out = client.getOutputStream();
        Scanner s = new Scanner(in, "UTF-8");

        byte[] bytes = json.getBytes();
        byte[] bytesSize = intToByteArray(json.length());
        outputStream.write(bytesSize, 0, 4);
        outputStream.write(bytes, 0, bytes.length);
        outputStream.flush();
    }
     */