package model;


import java.io.IOException;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import java.sql.Timestamp;
import java.sql.Types;

import java.util.ArrayList;
import java.util.Date;

import java.util.List;

import javax.naming.Binding;
import javax.naming.Context;
import javax.naming.InitialContext;

import javax.naming.NamingEnumeration;
import javax.naming.NamingException;

import javax.persistence.EntityManager;

import javax.sql.DataSource;

import oracle.jdbc.OracleCallableStatement;
import oracle.jdbc.OracleConnection;
import oracle.jdbc.OraclePreparedStatement;

import oracle.sql.NUMBER;


/**
 * Utility class to find a Database connection
 */
public class JdbcConnectionUtils {

    private InitialContext ctx;
    private static DataSource ds;
    private static JdbcConnectionUtils instance;

    /** 
     * Lock to manage concurrency access
     */
    private static Boolean initializationLock = new Boolean(true);
    
    /**
     * This constructor is private to conform singleton pattern
     * @throws DaoException
     */
    private JdbcConnectionUtils() {
        try {
            ctx = new InitialContext();
            
            ds = (DataSource)ctx.lookup("jdbc/tab");
        } catch (NamingException ne) {
            System.out.println("Init: Cannot init jdbc driver class " + ne);
        }
    }
//this class may be leaking database connections -- investigate cleanup 
    /**
     * Initialise the connection.
     * @return a singleton 
     * @throws DaoException
     */
    public static JdbcConnectionUtils getInstance() {
        if (instance == null) {
            synchronized (initializationLock) {
                if (initializationLock.equals(Boolean.TRUE)) {
                    instance = new JdbcConnectionUtils();
                    initializationLock = new Boolean(false);
                }
            }
        }

        return instance;
    }

    /**
     * Give a connection to the database.
     * @return
     * @throws DaoException
     */
    public Connection getConnection() {
        Connection connection;
        
        try {
            connection = ds.getConnection();
            connection.setAutoCommit(false);
//            try{
//
//                connection = new ro.kifs.diagnostic.Connection(connection);
//
//            }
//
//            catch(Exception x){
//
//                System.out.println("EX registering conn in conn collection date: " + x.getMessage());
//
//                x.printStackTrace();
//
//            }
            return connection;
        } catch (SQLException e) {
            System.out.println("Cannot get connection from DriverManager." + 
                               e);
            return null;
        }
    }

    // ----    Privates methods ----

    public static void CloseStatement(Statement s) {
        if (s != null) {
            try {
                s.close();
            } catch (Exception e) {

            }
        }
    }

    public static void CloseResultSet(ResultSet rs) {
        if (rs != null) {
            try {
                rs.close();
            } catch (Exception e) {

            }
        }
    }

    public static void CloseConnection(Connection c) {
        if (c != null) {
            try {
                if(!c.isClosed())
                    c.close();
            } catch (Exception e) {

            }
        }
    }
    
    public static void CloseDataSource() throws SQLException {
//        if(ds != null && ds.getConnection() != null) {
//            CloseConnection(ds.getConnection());
//        }
//        if(ds != null) {
////            CloseConnection(ds.getConnection());
//            
//            
//        }
    }
    public synchronized boolean insertLogMessage(String actionId, String ssoId, String assetId, String categoryId) {
        long milliseconds1 = (new Date()).getTime();
        ResultSet rset = null;
        OracleConnection conn = null;
        OracleCallableStatement insertStmt = null;
        try {
            conn = (OracleConnection)JdbcConnectionUtils.getInstance().getConnection();
            
       
            insertStmt = 
                    (OracleCallableStatement)conn.prepareCall("Insert into log (action_id, asset_id, category_id, sso_id) values (?,?,?,?)");

            insertStmt.setString(1, actionId);
            insertStmt.setString(2, assetId);
            insertStmt.setString(3, categoryId);
            insertStmt.setString(4, ssoId);         

            insertStmt.execute();

            conn.commit();
            return true;
        } catch (Exception e) {
            System.out.println("\n\nError inserting into Log table\n\n");
            e.printStackTrace();

        } finally {

            JdbcConnectionUtils.CloseResultSet(rset);
            JdbcConnectionUtils.CloseStatement(insertStmt);
            JdbcConnectionUtils.CloseConnection(conn);
        }

        return false;
    }
    
    public List<String> getHotOrNewAssetIds(boolean hot) {
        List<String> assetIdList = new ArrayList<String>();
        ResultSet rset = null;
        OracleConnection conn = null;
        OraclePreparedStatement selectStmt = null;
        
        try {
            conn = (OracleConnection)JdbcConnectionUtils.getInstance().getConnection();
            if(hot) {
                selectStmt = (OraclePreparedStatement) conn.prepareStatement("select a.id, count(1) from log l inner join asset a on l.asset_id = a.id where action_time > (sysdate - 30) and (action_id = '4' or action_id = '4') and l.sso_id not in ('derek.oneill@oracle.com', 'pat.davies@oracle.com', 'frank.baber@oracle.com', 'hamza.jahangir@oracle.com') group by a.id order by count(1) desc");
            }
            else {
                selectStmt = (OraclePreparedStatement) conn.prepareStatement("select a.id from asset a where a.entered_on > (sysdate - 30)");
            }
            rset = selectStmt.executeQuery();
            
            while(rset.next()) {
                assetIdList.add(rset.getString(1));
                if(hot && assetIdList.size() > 9) {
                    break;
                }
            }
            
        }
        catch (Exception e) {
                    System.out.println("\n\nError selecting from Log table\n\n");
                    e.printStackTrace();

                } 
        finally {
                    JdbcConnectionUtils.CloseResultSet(rset);
                    JdbcConnectionUtils.CloseStatement(selectStmt);
                    JdbcConnectionUtils.CloseConnection(conn);
        }
        
        return assetIdList;
    }
    
    public List<Log> getLogMessages(String action, int count) {
        List<Log> logList = new ArrayList<Log>();
        ResultSet rset = null;
        OracleConnection conn = null;
        OraclePreparedStatement selectStmt = null;
        if(count == 0) {
            return null;
        }
        
        try {
            conn = (OracleConnection)JdbcConnectionUtils.getInstance().getConnection();
            selectStmt = (OraclePreparedStatement) conn.prepareStatement("select * from (select * from log l inner join action a on l.action_id = a.id where upper(a.action) like upper(?) order by action_time desc) logs where rownum <= ? order by rownum");
            selectStmt.setString(1, action);
            selectStmt.setNUMBER(2,  new NUMBER(count));
            rset = selectStmt.executeQuery();
            
            while(rset.next()) {
                Log log = new Log();
                log.setActionId(rset.getString("action_id"));
                log.setAssetId(rset.getString("asset_id"));
                log.setCategoryId(rset.getString("category_id"));
                log.setSsoId(rset.getString("sso_id"));
                log.setActionTime(rset.getTimestamp("action_time"));
                logList.add(log);
            }
            
        }
        catch (Exception e) {
                    System.out.println("\n\nError selecting from Log table\n\n");
                    e.printStackTrace();

                } 
        finally {
                    JdbcConnectionUtils.CloseResultSet(rset);
                    JdbcConnectionUtils.CloseStatement(selectStmt);
                    JdbcConnectionUtils.CloseConnection(conn);
        }
        
        return logList;
    }
    
}