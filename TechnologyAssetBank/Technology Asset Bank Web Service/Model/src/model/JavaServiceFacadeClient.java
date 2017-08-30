package model;

import java.util.List;

public class JavaServiceFacadeClient {
    public static void main(String[] args) {
        try {
            final JavaServiceFacade javaServiceFacade = new JavaServiceFacade();
            for (Asset asset : (List<Asset>) javaServiceFacade.getAssetFindAll()) {
                printAsset(asset);
            }
            for (Category category : (List<Category>) javaServiceFacade.getCategoryFindAll()) {
                printCategory(category);
            }
            for (Log log : (List<Log>) javaServiceFacade.getLogFindAll()) {
                printLog(log);
            }
            for (Action action : (List<Action>) javaServiceFacade.getActionFindAll()) {
                printAction(action);
            }
            for (AssetCategories assetcategories : (List<AssetCategories>) javaServiceFacade.getAssetCategoriesFindAll()) {
                printAssetCategories(assetcategories);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
    private static void printAsset(Asset asset) {
        System.out.println("assetUrl = " + asset.getAssetUrl());
        System.out.println("contact = " + asset.getContact());
        System.out.println("createdBy = " + asset.getCreatedBy());
        System.out.println("description = " + asset.getDescription());
        System.out.println("enteredBy = " + asset.getEnteredBy());
        System.out.println("id = " + asset.getId());
        System.out.println("imageUrl = " + asset.getImageUrl());
        System.out.println("inDevelopment = " + asset.getInDevelopment());
        System.out.println("isVisible = " + asset.getIsVisible());
        System.out.println("name = " + asset.getName());
        System.out.println("postedOn = " + asset.getPostedOn());
        System.out.println("assetCategoriesList = " + asset.getAssetCategoriesList());
    }

    private static void printCategory(Category category) {
        System.out.println("categoryName = " + category.getCategoryName());
        System.out.println("iconUrl = " + category.getIconUrl());
        System.out.println("id = " + category.getId());
        System.out.println("assetCategoriesList = " + category.getAssetCategoriesList());
    }

    private static void printLog(Log log) {
        System.out.println("actionTime = " + log.getActionTime());
        System.out.println("id = " + log.getId());
        System.out.println("ssoId = " + log.getSsoId());
    }

    private static void printAction(Action action) {
        System.out.println("action = " + action.getAction());
        System.out.println("id = " + action.getId());
    }

    private static void printAssetCategories(AssetCategories assetcategories) {
        System.out.println("assetDisplayNumber = " + assetcategories.getAssetDisplayNumber());
        System.out.println("id = " + assetcategories.getId());
        System.out.println("asset = " + assetcategories.getAsset());
        System.out.println("category = " + assetcategories.getCategory());
    }
}
