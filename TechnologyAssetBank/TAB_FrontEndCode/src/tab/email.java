package tab;

import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.net.URL;
import javax.mail.*;
import javax.mail.internet.*;
import java.util.*;
import java.security.Security;
import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.imageio.ImageIO;

/*
 * This class uses the java mail API to send messages through the Oracle Beehive smtp server. 
 * This file requires a properties and key file to execute. At the moment the credentials used to 
 * send the email are frank.baber's but should be changed as required by the team. The class sends plain text or html or html with attachement emails
 * based on the method called. 
 */
public class email {
    
    crypto credintials = new crypto();
    String [] p = credintials.getEncryptedCredentials("http://innovate.us.oracle.com:81/tab_email/beehivepwd.key", "http://innovate.us.oracle.com:81/tab_email/beehive.properties");
    String[] auth = {p[0], p[1]};
    static String subject, body, from, send_to;
    //Pull the contact email addresses from the properties file whereever you post it. 
    String to = p[2];
    
    //String to house HTML source
    String htmlSource ="";
   
    /*
     * Construtor for sending a email to PSP team from the website.
     */
    
    public email(String v_subject, String v_body, String v_from) {
                  tab.email.setSubject(v_subject);
                  tab.email.setBody(v_body);
                  tab.email.setFrom(v_from);
              }
    
    /*
     * Constructor for sharing content from the PSP webpage. 
     */
    
    public email(String v_subject, String v_body, String v_from, String v_to) {
                   tab.email.setSubject(v_subject);
                   tab.email.setBody(v_body);
                   tab.email.setFrom(v_from);
                   tab.email.send_to= v_to;
              }
          
    /*
     * Sends a text email to psp team 
     */
    public  void sendMail() throws Exception {
            
            // args[0] - email id
            // args[1] - password
        try {
            Security.addProvider(new com.sun.net.ssl.internal.ssl.Provider());
            
            Properties props = new Properties();
            props.setProperty("mail.transport.protocol", "smtp");
            props.setProperty("mail.host", "stbeehive.oracle.com");
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.port", "465");
            props.put("mail.smtp.socketFactory.port", "465");
            props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
            props.put("mail.smtp.socketFactory.fallback", "false");
            props.setProperty("mail.smtp.quitwait", "false");
            
            
           Session session = Session.getInstance(props,new javax.mail.Authenticator() {
               protected PasswordAuthentication getPasswordAuthentication() {return new PasswordAuthentication(auth[0], auth[1]); } });

            MimeMessage message = new MimeMessage(session);            
            
            message.setSender(new InternetAddress( tab.email.getFrom()));
            
            message.setFrom(new InternetAddress( tab.email.getFrom()));
            
            message.setReplyTo(InternetAddress.parse( tab.email.getFrom()));
  
            message.setSubject( tab.email.getSubject());
            
            message.setContent(body, "text/plain");
           
            if (to.indexOf(',') > 0) {
               
                    message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            }
            else {
                    message.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
            }

            Transport.send(message);
        }
        catch (Exception e) {
            System.out.println("\nError in email.java sendmail() method.\n");
            e.printStackTrace();
        }
    }
    
    
   
  public static void main(String[] args) {
        System.out.println("Starting to send email.");
         //Test code for plain text email API   
        email tab = new email("TAB Subject","TAB Body","frank.baber@oracle.com","frank.baber@oracle.com");
        try{
        tab.sendMail();
        }
        catch (Exception e) {
            System.out.println(e.toString());
        }
        System.out.println("Exiting Program.");
    } 

    public static void setSubject(String subject) {
        email.subject = subject;
    }

    /**
     * @return
     */
    public static String getSubject() {
        return subject;
    }

    public static void setBody(String body) {
        email.body = body;
    }

    public static String getBody() {
        return body;
    }

    public static void setFrom(String from) {
        email.from = from;
    }

    public static String getFrom() {
        return from;
    }
}


