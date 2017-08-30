package tab;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import java.net.URL;

import java.security.GeneralSecurityException;
import java.security.NoSuchAlgorithmException;

import java.util.Properties;
import java.util.Scanner;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import javax.swing.JFrame;
import javax.swing.JOptionPane;

/*
 * Method Crypto uses AES encryption to encrypt and decript credentials to access the Oracle
 * SMTP server so the website can email. If new credentials need to be entered in order to send emails
 * please run the main method and it will prompt for the appropriate fields. Once the .properties and .key file
 * are generated please place them in the http://psp.us.oracle.com:9998/public/psp_keys/ directory and
 * make sure the names beehive.properties and beehivepwd.key.
 * */

public class crypto {
        public static final String AES = "AES";
 
    public crypto() {
    }
        
        /**
         * Code to encrypt and create a keyfile.
         */

        public static String encrypt(String value, File keyFile) throws GeneralSecurityException, IOException 
        {
          if (!keyFile.exists()) {
            KeyGenerator keyGen = KeyGenerator.getInstance(crypto.AES);
            keyGen.init(128);
            SecretKey sk = keyGen.generateKey();
            FileWriter fw = new FileWriter(keyFile);
            fw.write(byteArrayToHexString(sk.getEncoded()));
            fw.flush();
            fw.close();
          }
          
         SecretKeySpec sks = getSecretKeySpec(keyFile);
         Cipher cipher = Cipher.getInstance(crypto.AES);
         cipher.init(Cipher.ENCRYPT_MODE, sks, cipher.getParameters());
         byte[] encrypted = cipher.doFinal(value.getBytes());
         return byteArrayToHexString(encrypted);
        }
        
        /**
         * decrypt a value  
         * @throws GeneralSecurityException 
         * @throws IOException 
         */
        public static String decrypt(String message, File keyFile)  throws GeneralSecurityException, IOException 
        {
         SecretKeySpec sks = getSecretKeySpec(keyFile);
         Cipher cipher = Cipher.getInstance(crypto.AES);
         cipher.init(Cipher.DECRYPT_MODE, sks);
         byte[] decrypted = cipher.doFinal(hexStringToByteArray(message));
         return new String(decrypted);
        }
        
        /*
         * Overroad APIs to pul from url if possible as File caused issues.
         */
        public static String decrypt(String message, String key)  throws GeneralSecurityException, IOException 
        {
         SecretKeySpec sks = getSecretKeySpec(key);
         Cipher cipher = Cipher.getInstance(crypto.AES);
         cipher.init(Cipher.DECRYPT_MODE, sks);
         byte[] decrypted = cipher.doFinal(hexStringToByteArray(message));
         return new String(decrypted);
        }
        
        private static SecretKeySpec getSecretKeySpec(String keyFile)   throws NoSuchAlgorithmException, IOException 
        {
          byte [] key = readKeyFile(keyFile);
          SecretKeySpec sks = new SecretKeySpec(key, crypto.AES);
          return sks;
        }

       
        
        private static byte [] readKeyFile(String key)   throws FileNotFoundException 
        {
          return hexStringToByteArray(key);
        }
        
       
        
        private static SecretKeySpec getSecretKeySpec(File keyFile)   throws NoSuchAlgorithmException, IOException 
        {
          byte [] key = readKeyFile(keyFile);
          SecretKeySpec sks = new SecretKeySpec(key, crypto.AES);
          return sks;
        }

        private static byte [] readKeyFile(File keyFile)   throws FileNotFoundException 
        {
          Scanner scanner =  new Scanner(keyFile).useDelimiter("\\Z");
          String keyValue = scanner.next();
          scanner.close();
          return hexStringToByteArray(keyValue);
        }

        
        private static String byteArrayToHexString(byte[] b){
          StringBuffer sb = new StringBuffer(b.length * 2);
          for (int i = 0; i < b.length; i++){
            int v = b[i] & 0xff;
            if (v < 16) {
              sb.append('0');
            }
            sb.append(Integer.toHexString(v));
          }
          return sb.toString().toUpperCase();
        }

        private static byte[] hexStringToByteArray(String s) {
          byte[] b = new byte[s.length() / 2];
          for (int i = 0; i < b.length; i++){
            int index = i * 2;
            int v = Integer.parseInt(s.substring(index, index + 2), 16);
            b[i] = (byte)v;
          }
          return b;
        }
        
        public void createKeyandPropertiesFile() {
            try {
                //Get the parameters for the access
                JFrame frame = new JFrame();
                String directory = JOptionPane.showInputDialog(frame, "Please choose the directory where you would like your key and properties files to be saved:/n Example: c:\\temp\\ ");
                String KEY_FILE = directory+"beehivepwd.key";
                String PWD_FILE = directory+"beehive.properties";
               
                String email_address = JOptionPane.showInputDialog(frame, "Please enter your Beehive email address: ");
                String password = JOptionPane.showInputDialog(frame, "Please enter your Beehive password: ");
                String emailto = JOptionPane.showInputDialog(frame, "Please enter the PSP team members that should receive the email: firstname.lastname@oracle.com,firstname.lastname@oracle.com ");
                
                Properties p1 = new Properties();
                p1.put("emailto",emailto);
                p1.put("user", email_address);
                String encryptedPwd = crypto.encrypt(password, new File(KEY_FILE));
                p1.put("pwd", encryptedPwd);
                p1.store(new FileWriter(PWD_FILE), "");
                JOptionPane.showMessageDialog(frame, "Key and Properties Files Created in "+KEY_FILE+" and " + PWD_FILE + " . ");
                
            }
            catch (Exception e) {
                e.printStackTrace();
            }
        
        }
        
        public String[] getEncryptedCredentials(String KEY_FILE_LOCATION, String PWD_FILE_LOCATION) {
            String [] holder = new String[3];
            Properties p2 = new Properties();

        try {
            //InputStream pwdread = this.getClass().getClassLoader().getResourceAsStream(PWD_FILE_LOCATION);
            //ClassLoader cl = getClass().getClassLoader();
           // URL url = cl.getResource(KEY_FILE_LOCATION);
            
            //get the url of the properties file            
            URL pf = new URL (PWD_FILE_LOCATION);
            InputStream inputStream = pf.openStream();
            p2.load(inputStream);
            holder[0]=p2.getProperty("user");
            holder[2]=p2.getProperty("emailto");
            String encryptedPwd = p2.getProperty("pwd");
            
            //decrypt the password by first getting the key location
            URL url = new URL(KEY_FILE_LOCATION);
            //then buffering in the key values
            BufferedReader in = new BufferedReader( new InputStreamReader(url.openStream()));
            
            String inputLine ="", key="";
            while ((inputLine = in.readLine()) != null) {
                 key =key+inputLine;
            }
            in.close();
            
            holder[1] = crypto.decrypt(encryptedPwd, key);
            
           // tempFile.deleteOnExit();
           // holder[1]=crypto.decrypt(encryptedPwd, new File(url.toURI()));
            
            
        } catch (Exception e) {
            System.out.println("Error in crypto.getEncryptedCredentials()");
            e.printStackTrace();
        }
        return holder;
        }
        
 
     /**/   
        public static void main(String[] args) throws Exception {
            
           crypto a = new crypto();
                     
           //Create a new key
           a.createKeyandPropertiesFile();
           
           /*String p[] = a.getEncryptedCredentials("http://psp.us.oracle.com:9998/public/psp_keys/beehivepwd.key", "http://psp.us.oracle.com:9998/public/psp_keys/beehive.properties");
           System.out.println(p[0]);
           System.out.println(p[1]);
           System.out.println(p[2]);*/
            System.exit(0);

        }

}


