package model;

import java.io.Serializable;

import java.util.ArrayList;
import java.util.Date;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity
@NamedQueries({ @NamedQuery(name = "Asset.findAll", query = "select o from Asset o"), @NamedQuery(name = "Asset.findById", query = "select o from Asset o where o.id = :id") })
public class Asset implements Serializable {
    private static final long serialVersionUID = -7012880164898699141L;
    @Column(name = "ASSET_URL", nullable = false, length = 500)
    private String assetUrl;
    @Column(length = 200)
    private String contact;
    @Column(name = "CREATED_BY", length = 20)
    private String createdBy;
    @Column(length = 4000)
    private String description;
    @Column(name = "ENTERED_BY", length = 200)
    private String enteredBy;
    @Id
    @Column(nullable = false, length = 32)
    private String id;
    @Column(name = "IMAGE_URL", length = 500)
    private String imageUrl;
    @Column(name = "IN_DEVELOPMENT", length = 1)
    private String inDevelopment;
    @Column(name = "IS_VISIBLE", length = 1)
    private String isVisible;
    @Column(nullable = false, length = 150)
    private String name;
    @Temporal(TemporalType.DATE)
    @Column(name = "POSTED_ON")
    private Date postedOn;
    @Column(name = "IMAGE_METHOD", length = 200)
    private String imageMethod;
    @Column(name = "DELETED_IND", length = 1)
    private String deletedInd;
    
    @Transient
    private String postedOnFmt;
    
    @OneToMany(mappedBy = "asset", cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    private transient List<AssetCategories> assetCategoriesList;
    
    @Transient
    private List<Category> categories = new ArrayList<Category>();
    
    @Transient
    private String assetType;

    public Asset() {

    }

    public Asset(String assetUrl, String contact, String createdBy, String description, String enteredBy, String id, String imageUrl, String inDevelopment, String isVisible, String name, Date postedOn) {
        this.assetUrl = assetUrl;
        this.contact = contact;
        this.createdBy = createdBy;
        this.description = description;
        this.enteredBy = enteredBy;
        this.id = id;
        this.imageUrl = imageUrl;
        this.inDevelopment = inDevelopment;
        this.isVisible = isVisible;
        this.name = name;
        this.postedOn = postedOn;
    }

    public String getAssetUrl() {
        return assetUrl;
    }

    public void setAssetUrl(String assetUrl) {
        this.assetUrl = assetUrl;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEnteredBy() {
        return enteredBy;
    }

    public void setEnteredBy(String enteredBy) {
        this.enteredBy = enteredBy;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getInDevelopment() {
        return inDevelopment;
    }

    public void setInDevelopment(String inDevelopment) {
        this.inDevelopment = inDevelopment;
    }

    public String getIsVisible() {
        return isVisible;
    }

    public void setIsVisible(String isVisible) {
        this.isVisible = isVisible;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getPostedOn() {
        return postedOn;
    }

    public void setPostedOn(Date postedOn) {
        this.postedOn = postedOn;
    }

    public List<AssetCategories> getAssetCategoriesList() {
        return assetCategoriesList;
    }

    public void setAssetCategoriesList(List<AssetCategories> assetCategoriesList) {
        this.assetCategoriesList = assetCategoriesList;
    }

    public AssetCategories addAssetCategories(AssetCategories assetCategories) {
        getAssetCategoriesList().add(assetCategories);
        assetCategories.setAsset(this);
        return assetCategories;
    }

    public AssetCategories removeAssetCategories(AssetCategories assetCategories) {
        getAssetCategoriesList().remove(assetCategories);
        assetCategories.setAsset(null);
        return assetCategories;
    }


    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categoryList) {
        this.categories = categoryList;
    }

    public String getPostedOnFmt() {
        return postedOnFmt;
    }

    public void setPostedOnFmt(String postedOnFmt) {
        this.postedOnFmt = postedOnFmt;
    }

    public String getImageMethod() {
        return imageMethod;
    }

    public void setImageMethod(String imageMethod) {
        this.imageMethod = imageMethod;
    }

    public String getDeletedInd() {
        return deletedInd;
    }

    public void setDeletedInd(String deletedInd) {
        this.deletedInd = deletedInd;
    }

    public String getAssetType() {
        return assetType;
    }

    public void setAssetType(String assetType) {
        this.assetType = assetType;
    }
}
