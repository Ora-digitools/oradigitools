package view;

import java.util.ArrayList;
import java.util.List;

import model.Asset;

public class Assets {
    public Assets() {
        super();
    }
    private List<Asset> assets = new ArrayList<Asset>();

    public List<Asset> getAssets() {
        return assets;
    }

    public void setAssets(List<Asset> assetList) {
        this.assets = assetList;
    }
}
