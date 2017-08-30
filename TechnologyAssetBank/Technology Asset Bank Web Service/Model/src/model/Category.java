package model;

import java.io.Serializable;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

@Entity
@NamedQueries({ @NamedQuery(name = "Category.findAll", query = "select o from Category o order by o.orderBy"), @NamedQuery(name = "Category.findById", query = "select o from Category o where o.id = :id") })
public class Category implements Serializable {
    private static final long serialVersionUID = -3253799034349134213L;
    @Column(name = "CATEGORY_NAME", nullable = false, length = 200)
    private String categoryName;
    @Column(name = "PARENT_CATEGORY_ID", nullable = true, length = 32)
    private String parentCategoryId;
    @Column(name = "ICON_URL", length = 500)
    private String iconUrl;
    @Id
    @Column(nullable = false, length = 32)
    private String id;
    @OneToMany(mappedBy = "category", cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    private transient List<AssetCategories> assetCategoriesList;
    @Column(name = "ORDER_BY") 
    private String orderBy;
    @Transient
    private List<Category> subcategoryList;

    public Category() {
    }

    public Category(String categoryName, String iconUrl, String id) {
        this.categoryName = categoryName;
        this.iconUrl = iconUrl;
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getIconUrl() {
        return iconUrl;
    }

    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<AssetCategories> getAssetCategoriesList() {
        return assetCategoriesList;
    }

    public void setAssetCategoriesList(List<AssetCategories> assetCategoriesList) {
        this.assetCategoriesList = assetCategoriesList;
    }

    public AssetCategories addAssetCategories(AssetCategories assetCategories) {
        getAssetCategoriesList().add(assetCategories);
        assetCategories.setCategory(this);
        return assetCategories;
    }

    public AssetCategories removeAssetCategories(AssetCategories assetCategories) {
        getAssetCategoriesList().remove(assetCategories);
        assetCategories.setCategory(null);
        return assetCategories;
    }

    public String getParentCategoryId() {
        return parentCategoryId;
    }

    public void setParentCategoryId(String subcategoryName) {
        this.parentCategoryId = subcategoryName;
    }

    public List<Category> getSubcategoryList() {
        if(subcategoryList == null)
            subcategoryList = new ArrayList<Category>();
        return subcategoryList;
    }

    public void setSubcategoryList(List<Category> subcategoryList) {
        this.subcategoryList = subcategoryList;
    }

    public String getOrderBy() {
        return orderBy;
    }

    public void setOrderBy(String orderBy) {
        this.orderBy = orderBy;
    }
}
