package model;

import java.io.Serializable;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@NamedQueries({ @NamedQuery(name = "AssetCategories.findAll", query = "select o from AssetCategories o order by o.assetDisplayNumber"),
                @NamedQuery(name = "AssetCategories.findById", query = "select o from AssetCategories o where o.id = :id"), 
                @NamedQuery(name = "AssetCategories.findByCategoryId", query = "select o from AssetCategories o where o.category.id = :categoryId") })
@Table(name = "ASSET_CATEGORIES")
public class AssetCategories implements Serializable {
    private static final long serialVersionUID = 4536101137175335041L;
    @Column(name = "ASSET_DISPLAY_NUMBER")
    private BigDecimal assetDisplayNumber;
    @Id
    @Column(nullable = false, length = 32)
    private String id;
    @ManyToOne
    @JoinColumn(name = "ASSET_ID")
    private Asset asset;
    @ManyToOne
    @JoinColumn(name = "CATEGORY_ID")
    private Category category;

    public AssetCategories() {
    }

    public AssetCategories(BigDecimal assetDisplayNumber, Asset asset, Category category, String id) {
        this.assetDisplayNumber = assetDisplayNumber;
        this.asset = asset;
        this.category = category;
        this.id = id;
    }

    public BigDecimal getAssetDisplayNumber() {
        return assetDisplayNumber;
    }

    public void setAssetDisplayNumber(BigDecimal assetDisplayNumber) {
        this.assetDisplayNumber = assetDisplayNumber;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Asset getAsset() {
        return asset;
    }

    public void setAsset(Asset asset) {
        this.asset = asset;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
