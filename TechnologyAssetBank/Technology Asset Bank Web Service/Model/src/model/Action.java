package model;

import java.io.Serializable;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;

@Entity
@NamedQueries({ @NamedQuery(name = "Action.findAll", query = "select o from Action o"), @NamedQuery(name = "Action.findById", query = "select o from Action o where o.id = :id") })
public class Action implements Serializable {
    private static final long serialVersionUID = -9193236838301452723L;
    @Column(nullable = false, length = 200)
    private String action;
    @Id
    @Column(nullable = false, length = 32)
    private String id;


    public Action() {
    }

    public Action(String action, String id) {
        this.action = action;
        this.id = id;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    


}
