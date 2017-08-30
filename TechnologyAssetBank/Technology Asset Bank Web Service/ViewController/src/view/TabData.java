package view;

import java.util.ArrayList;
import java.util.List;

import model.Asset;
import model.Category;

public class TabData {
    public TabData() {
        super();
    }
    private List<Asset> assets = new ArrayList<Asset>();
    private List<Category> categories = new ArrayList<Category>();

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> assetList) {
        this.categories = assetList;
    }

    public List<Asset> getAssets() {
        return assets;
    }

    public void setAssets(List<Asset> assetList) {
        this.assets = assetList;
    }
}
