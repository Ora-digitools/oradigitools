package view;

import java.util.ArrayList;
import java.util.List;

import model.AssetType;

public class AssetTypes {
    public AssetTypes() {
        super();
    }
    private List<AssetType> assetTypes = new ArrayList<AssetType>();

    public List<AssetType> getAssetTypes() {
        return assetTypes;
    }

    public void setAssetTypes(List<AssetType> assetTypes) {
        this.assetTypes = assetTypes;
    }
}
