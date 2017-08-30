package model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@NamedQueries({ @NamedQuery(name = "AssetAtRel.findAll", query = "select o from AssetAtRel o"), @NamedQuery(name = "AssetAtRel.findByAssetId", query = "select o from AssetAtRel o where o.assetId = :assetId") })
@Table(name = "ASSET_AT_REL")
public class AssetAtRel implements Serializable {
    private static final long serialVersionUID = -1443065457413286923L;
    @Column(name = "ASSET_ID", nullable = false, length = 32)
    private String assetId;
    @Column(name = "AT_ID", nullable = false, length = 32)
    private String atId;
    @Id
    @Column(nullable = false, length = 32)
    private String id;

    public AssetAtRel() {
    }

    public AssetAtRel(String assetId, String atId, String id) {
        this.assetId = assetId;
        this.atId = atId;
        this.id = id;
    }

    public String getAssetId() {
        return assetId;
    }

    public void setAssetId(String assetId) {
        this.assetId = assetId;
    }

    public String getAtId() {
        return atId;
    }

    public void setAtId(String atId) {
        this.atId = atId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
