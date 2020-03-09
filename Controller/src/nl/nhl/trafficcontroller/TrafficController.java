package nl.nhl.trafficcontroller;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;

public class TrafficController {
    public static void main(String[] args) {
        System.out.println("Hallo Allemaal");
        WebsocketConnection connection = new WebsocketConnection();
        while (true) {
            String[] helloWorld = new String[]{"Hello", "World"};
        }

/*

try{
         //   connection.TestConnection();
            connection.TestSendJSON();
        }
        catch(NoSuchAlgorithmException | IOException e){

        }

 */


    }
}
