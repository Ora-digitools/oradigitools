package view;

import com.google.gson.Gson;

import com.google.gson.JsonObject;

import java.text.SimpleDateFormat;

import java.util.ArrayList;
import java.util.List;

import java.util.Locale;

import javax.servlet.ServletContext;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import model.Asset;
import model.AssetAtRel;
import model.AssetCategories;
import model.AssetType;
import model.Category;
import model.JavaServiceFacade;
import model.JdbcConnectionUtils;
import model.Log;

@Path("view")
@Consumes("text/plain")
@Produces("application/json")
public class TabService {
     
    SimpleDateFormat formatter = new SimpleDateFormat("dd MMMM yyyy", Locale.US);
    
    public TabService() {
        
        
    }
    @OPTIONS
    @Path("/options")
    public Response getOptions() {
      return Response.ok()
        .header("Access-Control-Allow-Origin", "*")
        .header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS")
        .header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
    }
    
    @POST
    public Response postData(String content) {

        // Provide method implementation.
        // TODO

        throw new UnsupportedOperationException();
    }

    @GET
    public String getData() {

        // Provide method implementation.
        // TODO
        return "{\"name\": \"test\"}";

        //        throw new UnsupportedOperationException();
    }

    //    @GET
    //    @Produces(MediaType.TEXT_PLAIN)
    //    @Path("/assets/all")
    //    public String getAllAssets() {
    //        Gson gson = new Gson();
    //        JavaServiceFacade tabModel = new JavaServiceFacade();
    //        List<Asset> assetList = tabModel.getAssetFindAll();
    //        return gson.toJson(assetList) ;
    //    }
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/log")
    public void acceptLogMessage(String jsonLogMessage) {
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
        }
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/assets/{category}")
    public Response getAssetsInCategory(@PathParam("category") String category) {
        Gson gson = new Gson();
        Assets assets = new Assets();
        List<Asset> assetListFiltered = new ArrayList<Asset>();
        JavaServiceFacade tabModel = new JavaServiceFacade();
        try {
            if (category == null || category.equals("")) {
                category = "all";
            }
            List<AssetCategories> assetCategoryList = tabModel.getAssetCategoriesFindAll();
            for (AssetCategories assetCategories : assetCategoryList) {
                if ("all".equalsIgnoreCase(category) || assetCategories.getCategory().getCategoryName().equalsIgnoreCase(category)) {
                    Asset asset = assetCategories.getAsset();
                    //                    asset.getCategories().add(assetCategories.getCategory());
                    if(!assetListFiltered.contains(asset)) {
                        if("Y".equalsIgnoreCase(asset.getIsVisible()) && "N".equalsIgnoreCase(asset.getDeletedInd())) {
                            assetListFiltered.add(asset);
                            List<AssetAtRel> aar = tabModel.getAssetAtRelByAssetId(assetCategories.getAsset().getId());
                            String type = "unknown";
                            if(aar.size() == 1) {
                                type = tabModel.getAssetTypeFindById(aar.get(0).getAtId()).get(0).getName();
                            }
                            asset.setAssetType(type);
                        }
                    }
                }
            }
            List<String> hotAssetIdList = JdbcConnectionUtils.getInstance().getHotOrNewAssetIds(true);
            List<String> newAssetIdList = JdbcConnectionUtils.getInstance().getHotOrNewAssetIds(false);
            String newCategoryId = "339916B8621B0A95E0530100007FD01B";
            String hotCategoryId = "339916B8621A0A95E0530100007FD01B";
            
            for (Asset asset : assetListFiltered) {
                if(asset.getPostedOn() != null)
                    asset.setPostedOnFmt(formatter.format(asset.getPostedOn()));
                if("Upload".equals(asset.getImageMethod())) {
                    asset.setImageUrl("http://innovate.us.oracle.com:81/pls/apex/get_image?p_id="+asset.getId());
                }
                asset.getCategories().clear();
                for(String hotAssetId : hotAssetIdList) {
                    if(asset.getId().equals(hotAssetId)) {
                        asset.getCategories().add(tabModel.getCategoryFindById(hotCategoryId).get(0));
                    }
                }
                for(String newAssetId : newAssetIdList) {
                    if(asset.getId().equals(newAssetId)) {
                        asset.getCategories().add(tabModel.getCategoryFindById(newCategoryId).get(0));
                    }
                }
                for (AssetCategories assetCategories : assetCategoryList) {
                    if (assetCategories.getAsset().getId().equals(asset.getId())) {
                        asset.getCategories().add(assetCategories.getCategory());
                        if(assetCategories.getCategory().getParentCategoryId() != null && !assetCategories.getCategory().getParentCategoryId().equals("")) {
                            List<Category> categories = tabModel.getCategoryFindById(assetCategories.getCategory().getParentCategoryId());
                            asset.getCategories().add(categories.get(0));
                        }
                    }
                }
            }
//            for (Asset asset : assetListFiltered) {
//                for (Category cat : asset.getCategories()) {
//                    populateSubcategoryList(cat);
//                }
//            }
        } catch (Exception ex) {
            ex.printStackTrace();
            return Response.serverError().build();// ex.getMessage();
        } finally {
            tabModel.closeEm();
            tabModel.cleanUp();
        }
        assets.getAssets().addAll(assetListFiltered);
        String json = gson.toJson(assets);
        return Response.ok(json).header("Access-Control-Allow-Origin", "*").build();
    }
    
    private void populateSubcategoryList(Category category) {
        JavaServiceFacade tabModel = new JavaServiceFacade();
        try {
            List<Category> categoryList = tabModel.getCategoryFindAll();
            for(Category cat : categoryList) {
                if(cat.getParentCategoryId() != null && cat.getParentCategoryId().equals(category.getId())) {
                    List<AssetCategories> acList = tabModel.getAssetCategoriesFindByCategoryId(cat.getId());
                    if(acList.size() > 0) {
                        category.getSubcategoryList().add(cat);
                    }
                    for(Category cat2 : categoryList) {
                        if(cat2.getParentCategoryId() != null && cat2.getParentCategoryId().equals(cat.getId())) {
                            List<AssetCategories> acList2 = tabModel.getAssetCategoriesFindByCategoryId(cat2.getId());
                            if(acList2.size() > 0) {
                                cat.getSubcategoryList().add(cat2);
                            }
                        }
                    }
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            tabModel.closeEm();
            tabModel.cleanUp();
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/categories/{category}")
    public Response getCategories(@PathParam("category") String category) {
        Gson gson = new Gson();
        List<Category> categoryListFiltered = new ArrayList<Category>();
        Categories categories = new Categories();
        JavaServiceFacade tabModel = new JavaServiceFacade();
        String newCategoryId = "339916B8621B0A95E0530100007FD01B";
        String hotCategoryId = "339916B8621A0A95E0530100007FD01B";
        
        try {
            if (category == null || category.equals("")) {
                category = "all";
            }
            List<Category> categoryList = tabModel.getCategoryFindAll();
            for (Category categoryObj : categoryList) {
                if ("all".equalsIgnoreCase(category) || categoryObj.getCategoryName().equalsIgnoreCase(category)) {
                    if(categoryObj.getParentCategoryId() == null) {
                        populateSubcategoryList(categoryObj);
                        List<AssetCategories> acList = tabModel.getAssetCategoriesFindByCategoryId(categoryObj.getId());
                        if(acList.size() > 0 || categoryObj.getSubcategoryList().size() > 0 || categoryObj.getId().equals(hotCategoryId) || categoryObj.getId().equals(newCategoryId)) {
                            categoryListFiltered.add(categoryObj); 
                        }
                    }
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            return Response.serverError().build();// ex.getMessage();
        } finally {
            tabModel.closeEm();
            tabModel.cleanUp();
        }
        categories.getCategories().addAll(categoryListFiltered);
        String json = gson.toJson(categories);
        return Response.ok(json).header("Access-Control-Allow-Origin", "*").build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/assettypes")
    public Response getAssetTypes() {
        Gson gson = new Gson();
        List<AssetType> atList = null;
        AssetTypes at = new AssetTypes();
        JavaServiceFacade tabModel = new JavaServiceFacade();
        try {
            atList = tabModel.getAssetTypeFindAll();
            
        } catch (Exception ex) {
            ex.printStackTrace();
            return Response.serverError().build();// ex.getMessage();
        } finally {
            tabModel.closeEm();
            tabModel.cleanUp();
        }
        at.getAssetTypes().addAll(atList);
        String json = gson.toJson(at);
        return Response.ok(json).header("Access-Control-Allow-Origin", "*").build();
    }
    
//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    @Path("/all")
//    public Response getAllAssetsAndCategories() {
//        Gson gson = new Gson();
//        TabData tabData = new TabData();
//        List<Asset> assetListFiltered = new ArrayList<Asset>();
//        List<Category> categoryList = new ArrayList<Category>();
//        List<AssetCategories> assetCategoryList = new ArrayList<AssetCategories>();
//        JavaServiceFacade tabModel = new JavaServiceFacade();
//        try {
//            assetCategoryList = tabModel.getAssetCategoriesFindAll();
//            assetListFiltered = tabModel.getAssetFindAll();
//            categoryList = tabModel.getCategoryFindAll();
//
//            for (Asset asset : assetListFiltered) {
//                if(asset.getPostedOn() != null)
//                    asset.setPostedOnFmt(formatter.format(asset.getPostedOn()));
//                asset.getCategories().clear();
//                for (AssetCategories assetCategories : assetCategoryList) {
//                    if (assetCategories.getAsset().getId().equals(asset.getId())) {
//                        asset.getCategories().add(assetCategories.getCategory());
//                    }
//                }
//            }
//            for (Asset asset : assetListFiltered) {
//                for (Category cat : asset.getCategories()) {
//                    if(cat.getParentCategoryId() == null) {
//                        populateSubcategoryList(cat);
//                    }
//                }
//            }
//
//        } catch (Exception ex) {
//            ex.printStackTrace();
//            return Response.serverError().build();// ex.getMessage();
//        } finally {
//            tabModel.closeEm();
//            tabModel.cleanUp();
//        }
//        tabData.getAssets().addAll(assetListFiltered);
//        tabData.getCategories().addAll(categoryList);
//
//        String json = gson.toJson(tabData);
//        return Response.ok(json).header("Access-Control-Allow-Origin", "*").build();
//    }
}
