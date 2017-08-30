package model;

import java.io.Serializable;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

@Entity
@NamedQueries({ @NamedQuery(name = "Log.findAll", query = "select o from Log o"), @NamedQuery(name = "Log.findRecentAssetActions", query = "select o from Log o where o.actionTime > :timestamp and o.actionId = '2' or o.actionId = '4'") })
public class Log implements Serializable {
    private static final long serialVersionUID = 8134399824588352615L;
    @Column(name = "ACTION_TIME", nullable = false)
    private Timestamp actionTime;
    @Id
    @Column(nullable = false, length = 32)
    private String id;
    @Column(name = "SSO_ID", nullable = false, length = 200)
    private String ssoId;

    @Column(name = "ACTION_ID")
    private String actionId;    
    @Column(name = "ASSET_ID")
    private String assetId;    
    @Column(name = "CATEGORY_ID")
    private String categoryId;

    public Log() {
    }
    
    public String toString() {
        return "Time: " + actionTime + " User: " + ssoId + " Action: " + actionId + " Asset: " + assetId + " Category: " + categoryId;
    }
    public String toHtmlTableRow() {
        return "<tr><td>Time: " + actionTime + "</td><td>User: " + ssoId + "</td><td>Action: " + actionId + "</td><td>Asset: " + assetId + "</td><td>Category: " + categoryId + "</td></tr>";
    }
    public String toHtmlTableRowValuesOnly() {
        return "<tr><td>" + actionTime + "</td><td>" + ssoId + "</td><td>" + actionId + "</td><td>" + assetId + "</td><td>" + categoryId + "</td></tr>";
    }

    public Log(Action action, Timestamp actionTime, Asset asset, String id, String ssoId) {
//        this.action = action;
        this.actionTime = actionTime;
//        this.asset = asset;
        this.id = id;
        this.ssoId = ssoId;
    }


    public Timestamp getActionTime() {
        return actionTime;
    }

    public void setActionTime(Timestamp actionTime) {
        this.actionTime = actionTime;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSsoId() {
        return ssoId;
    }

    public void setSsoId(String ssoId) {
        this.ssoId = ssoId;
    }

    public String getActionId() {
        return actionId;
    }

    public void setActionId(String actionId) {
        this.actionId = actionId;
    }

    public String getAssetId() {
        return assetId;
    }

    public void setAssetId(String assetId) {
        this.assetId = assetId;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }
}
