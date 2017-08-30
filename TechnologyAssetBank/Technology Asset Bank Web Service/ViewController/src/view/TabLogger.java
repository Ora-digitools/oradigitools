package view;

import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import model.Action;
import model.Asset;
import model.Category;
import model.JavaServiceFacade;
import model.JdbcConnectionUtils;
import model.Log;

import org.glassfish.jersey.server.ResourceConfig;

@Path("log")
public class TabLogger {
    public TabLogger() {
        ResourceConfig rc;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response acceptLogMessage(String jsonLogMessage) {
        Gson gson = new Gson();
        LogMessage log = gson.fromJson(jsonLogMessage, LogMessage.class);
    //        System.out.println(log.getAction().getAction());
    //        System.out.println(log.getSsoId());
        try {
            JdbcConnectionUtils jdbc = JdbcConnectionUtils.getInstance();
            jdbc.insertLogMessage(log.getActionId(), log.getSsoId(), log.getAssetId(), log.getCategoryId());
        }
        catch (Exception e) {
            e.printStackTrace();
            return Response.ok("Failure").header("Access-Control-Allow-Origin", "*").build();
        }
        
        return Response.ok("Success").header("Access-Control-Allow-Origin", "*").build();
    }
    

    @GET
    @Path("/list")
    public Response getAllLogMessages() { 
        return getLogMessages(Integer.MAX_VALUE);   
    }
    

    @GET
    @Path("/list/{count}")
    public Response getLogMessages(@PathParam("count") int count) {
        return getLogMessages("all", count);
    }
    
    @GET
    @Path("/list/{action}/{count}")
    public Response getLogMessages(@PathParam("action") String action, @PathParam("count") int count) {
        List<Log> logList = new ArrayList<Log>();
        
        if(action == null || action.equals("") || action.equalsIgnoreCase("all")) {
            action = "%";
        }
        if(count == 0) {
            count = Integer.MAX_VALUE;
        }
        
        JavaServiceFacade tabModel = new JavaServiceFacade();
        try {
            JdbcConnectionUtils jdbc = JdbcConnectionUtils.getInstance();
            logList = jdbc.getLogMessages(action, count);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        StringBuilder sb = new StringBuilder();
        sb.append("<html><head><style>\n" + 
        "body {background-color: #FFF}\n" + 
        "table, td, th {border: 1px solid #CCC; font-family:helvetica; border-collapse: collapse; padding:5px;}\n" + 
        "</style></head><body><H3>Fetched most recent " + logList.size() + " rows.</H3><table><tr style=\"font-weight: bold; background-color: lightgray;\"><td>Time</td><td>User</td><td>Action</td><td>Category</td><td>Asset</td></tr>");
        try {
            for (Log log : logList) {
               List<Action> actions = tabModel.getActionFindById(log.getActionId());
               List<Asset> assets = tabModel.getAssetFindById(log.getAssetId());
               List<Category> categories = tabModel.getCategoryFindById(log.getCategoryId());
               sb.append( "<tr><td>" + log.getActionTime() + "</td><td>" + log.getSsoId() + "</td><td>" + (actions.size() > 0 ? actions.get(0).getAction() : "n/a") + "</td><td>" + (categories.size() > 0 ? categories.get(0).getCategoryName() : (log.getActionId().equals("3") ? "All" : "n/a")) + "</td><td>" +(assets.size() > 0 ? assets.get(0).getName() : "n/a")  + "</td></tr>");
           }
        }
        catch(Exception e) {
            sb.append("Error Producing Log Table!");
            sb.append(e.getMessage());
        }
        finally {
            tabModel.closeEm();
            tabModel.cleanUp();
        }
        sb.append("</table></body></html>");
        
        return Response.ok(sb.toString()).header("Access-Control-Allow-Origin", "*").build();
    }
}
