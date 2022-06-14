package com.samuksa.dto;

public class FishInfo {
    private int fishInfoId;
    private String fishName;
    private int yield;
    private String imgUrl;

    public FishInfo(int fishInfoId, String fishName, int yield, String imgUrl) {
        this.fishInfoId = fishInfoId;
        this.fishName = fishName;
        this.yield = yield;
        this.imgUrl = imgUrl;
    }

    public int getFishInfoId() {
        return fishInfoId;
    }

    public String getFishName() {
        return fishName;
    }

    public int getYield() {
        return yield;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setFishInfoId(int fishInfoId) {
        this.fishInfoId = fishInfoId;
    }

    public void setFishName(String fishName) {
        this.fishName = fishName;
    }

    public void setYield(int yield) {
        this.yield = yield;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }
}
