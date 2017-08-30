package model;

import java.util.List;

import javax.annotation.Resource;

import javax.ejb.SessionContext;
import javax.ejb.Stateless;

import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Stateless(name = "DummyEjb", mappedName = "tab-Model-DummyEjb")
public class DummyEjbBean implements DummyEjb, DummyEjbLocal {
    @Resource
    SessionContext sessionContext;
    @PersistenceContext(unitName = "Model")
    private EntityManager em;

    public DummyEjbBean() {
    }

    @TransactionAttribute(TransactionAttributeType.NOT_SUPPORTED)
    public Object queryByRange(String jpqlStmt, int firstResult, int maxResults) {
        Query query = em.createQuery(jpqlStmt);
        if (firstResult > 0) {
            query = query.setFirstResult(firstResult);
        }
        if (maxResults > 0) {
            query = query.setMaxResults(maxResults);
        }
        return query.getResultList();
    }

    public <T> T persistEntity(T entity) {
        em.persist(entity);
        return entity;
    }

    public <T> T mergeEntity(T entity) {
        return em.merge(entity);
    }

    public void removeAsset(Asset asset) {
        asset = em.find(Asset.class, asset.getId());
        em.remove(asset);
    }

    /** <code>select o from Asset o</code> */
    @TransactionAttribute(TransactionAttributeType.NOT_SUPPORTED)
    public List<Asset> getAssetFindAll() {
        return em.createNamedQuery("Asset.findAll", Asset.class).getResultList();
    }

    public void removeCategory(Category category) {
        category = em.find(Category.class, category.getId());
        em.remove(category);
    }

    /** <code>select o from Category o</code> */
    @TransactionAttribute(TransactionAttributeType.NOT_SUPPORTED)
    public List<Category> getCategoryFindAll() {
        return em.createNamedQuery("Category.findAll", Category.class).getResultList();
    }

    public void removeLog(Log log) {
        log = em.find(Log.class, log.getId());
        em.remove(log);
    }

    /** <code>select o from Log o</code> */
    @TransactionAttribute(TransactionAttributeType.NOT_SUPPORTED)
    public List<Log> getLogFindAll() {
        return em.createNamedQuery("Log.findAll", Log.class).getResultList();
    }

    public void removeAction(Action action) {
        action = em.find(Action.class, action.getId());
        em.remove(action);
    }

    /** <code>select o from Action o</code> */
    @TransactionAttribute(TransactionAttributeType.NOT_SUPPORTED)
    public List<Action> getActionFindAll() {
        return em.createNamedQuery("Action.findAll", Action.class).getResultList();
    }

    public void removeAssetCategories(AssetCategories assetCategories) {
        assetCategories = em.find(AssetCategories.class, assetCategories.getId());
        em.remove(assetCategories);
    }

    /** <code>select o from AssetCategories o</code> */
    @TransactionAttribute(TransactionAttributeType.NOT_SUPPORTED)
    public List<AssetCategories> getAssetCategoriesFindAll() {
        return em.createNamedQuery("AssetCategories.findAll", AssetCategories.class).getResultList();
    }
}
