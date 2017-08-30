package model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@NamedQueries({ @NamedQuery(name = "AssetType.findAll", query = "select o from AssetType o order by o.name"), @NamedQuery(name = "AssetType.findById", query = "select o from AssetType o where o.id = :id") })
@Table(name = "ASSET_TYPE")
public class AssetType implements Serializable {
    private static final long serialVersionUID = 7134315877993748032L;
    @Id
    @Column(nullable = false, length = 32)
    private String id;
    @Column(nullable = false, length = 400)
    private String name;

    public AssetType() {
    }

    public AssetType(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
