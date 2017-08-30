package view;

import java.util.ArrayList;
import java.util.List;

import model.Asset;
import model.Category;

public class Categories {
    public Categories() {
        super();
    }
    private List<Category> categories = new ArrayList<Category>();

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> assetList) {
        this.categories = assetList;
    }
}
