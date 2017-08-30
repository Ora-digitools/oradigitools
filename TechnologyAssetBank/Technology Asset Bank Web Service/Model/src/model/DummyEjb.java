package model;

import java.util.List;

import javax.ejb.Remote;

@Remote
public interface DummyEjb {
    Object queryByRange(String jpqlStmt, int firstResult, int maxResults);

    <T> T persistEntity(T entity);

    <T> T mergeEntity(T entity);

    void removeAsset(Asset asset);

    List<Asset> getAssetFindAll();

    void removeCategory(Category category);

    List<Category> getCategoryFindAll();

    void removeLog(Log log);

    List<Log> getLogFindAll();

    void removeAction(Action action);

    List<Action> getActionFindAll();

    void removeAssetCategories(AssetCategories assetCategories);

    List<AssetCategories> getAssetCategoriesFindAll();
}
