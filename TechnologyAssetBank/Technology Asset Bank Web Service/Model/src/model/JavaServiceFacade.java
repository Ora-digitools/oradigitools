package model;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import javax.persistence.Query;

public class JavaServiceFacade {
    
    private final EntityManagerFactory emf = Persistence.createEntityManagerFactory("Model");
    private final EntityManager em;
    
    private static JavaServiceFacade _instance;

    public JavaServiceFacade() {
        em = emf.createEntityManager();
    }
    
    public static synchronized JavaServiceFacade getInstance() {
        if (_instance == null) {
            try {
                _instance = new JavaServiceFacade();
            } catch (Exception e) { 
                return null;   
            }
        }
        
        return (_instance);
    }
    
    public void closeEm() {
        em.close();
        
        
    }
    
    public void cleanUp() {
        if(emf != null && emf.isOpen()) {
//            System.out.println("closing emf");
            emf.close();
        }
    }

    /**
     * All changes that have been made to the managed entities in the
     * persistence context are applied to the database and committed.
     */
    public void commitTransaction() {
        final EntityTransaction entityTransaction = em.getTransaction();
        if (!entityTransaction.isActive()) {
            entityTransaction.begin();
        }
        entityTransaction.commit();
    }

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
        commitTransaction();
        return entity;
    }

    public <T> T mergeEntity(T entity) {
        entity = em.merge(entity);
        commitTransaction();
        return entity;
    }

    public void removeAsset(Asset asset) {
        asset = em.find(Asset.class, asset.getId());
        em.remove(asset);
        commitTransaction();
    }

    /** <code>select o from Asset o</code> */
    public List<Asset> getAssetFindAll() {
        return em.createNamedQuery("Asset.findAll", Asset.class).setHint("eclipselink.refresh", "true").getResultList();
    }

    public void removeCategory(Category category) {
        category = em.find(Category.class, category.getId());
        em.remove(category);
        commitTransaction();
    }

    /** <code>select o from Category o</code> */
    public List<Category> getCategoryFindAll() {
        return em.createNamedQuery("Category.findAll", Category.class).setHint("eclipselink.refresh", "true").getResultList();
    }

    public void removeLog(Log log) {
        log = em.find(Log.class, log.getId());
        em.remove(log);
        commitTransaction();
    }

    /** <code>select o from Log o</code> */
    public List<Log> getLogFindAll() {
        return em.createNamedQuery("Log.findAll", Log.class).setHint("eclipselink.refresh", "true").getResultList();
    }

    public void removeAction(Action action) {
        action = em.find(Action.class, action.getId());
        em.remove(action);
        commitTransaction();
    }

    /** <code>select o from Action o</code> */
    public List<Action> getActionFindAll() {
        return em.createNamedQuery("Action.findAll", Action.class).setHint("eclipselink.refresh", "true").getResultList();
    }

    public void removeAssetCategories(AssetCategories assetCategories) {
        assetCategories = em.find(AssetCategories.class, assetCategories.getId());
        em.remove(assetCategories);
        commitTransaction();
    }

    /** <code>select o from AssetCategories o</code> */
    public List<AssetCategories> getAssetCategoriesFindAll() {
        return em.createNamedQuery("AssetCategories.findAll", AssetCategories.class).setHint("eclipselink.refresh", "true").getResultList();
    }    
    public List<AssetCategories> getAssetCategoriesFindByCategoryId(String categoryId) {
        return em.createNamedQuery("AssetCategories.findByCategoryId", AssetCategories.class).setParameter("categoryId", categoryId).setHint("eclipselink.refresh", "true").getResultList();
    }
    
    public List<Action> getActionFindById(String id) {
        return em.createNamedQuery("Action.findById", Action.class).setParameter("id", id).setHint("eclipselink.refresh", "true").getResultList();
    }
    public List<Asset> getAssetFindById(String id) {
        return em.createNamedQuery("Asset.findById", Asset.class).setParameter("id", id).setHint("eclipselink.refresh", "true").getResultList();
    }
    public List<Category> getCategoryFindById(String id) {
        return em.createNamedQuery("Category.findById", Category.class).setParameter("id", id).setHint("eclipselink.refresh", "true").getResultList();
    }
    public List<AssetAtRel> getAssetAtRelByAssetId(String id) {
        return em.createNamedQuery("AssetAtRel.findByAssetId", AssetAtRel.class).setParameter("assetId", id).setHint("eclipselink.refresh", "true").getResultList();
    }
    public List<AssetType> getAssetTypeFindById(String id) {
        return em.createNamedQuery("AssetType.findById", AssetType.class).setParameter("id", id).setHint("eclipselink.refresh", "true").getResultList();
    }
    public List<AssetType> getAssetTypeFindAll() {
        return em.createNamedQuery("AssetType.findAll", AssetType.class).setHint("eclipselink.refresh", "true").getResultList();
    }
}
