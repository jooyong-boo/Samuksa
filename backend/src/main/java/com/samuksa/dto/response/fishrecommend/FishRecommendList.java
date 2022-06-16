package com.samuksa.dto.response.fishrecommend;

public class FishRecommendList {
    private String fishName;

    private int price;

    private String size;

    private int fishYeild;

    private int minWeight;

    private int maxWeight;

    private int serving;
    public FishRecommendList(String fishName, int price, String size, int fishYeild, int minWeight, int maxWeight, int serving) {
        this.fishName = fishName;
        this.price = price;
        this.size = size;
        this.fishYeild = fishYeild;
        this.minWeight = minWeight;
        this.maxWeight = maxWeight;
        this.serving = serving;
    }

    public String getFishName() {
        return fishName;
    }

    public int getPrice() {
        return price;
    }

    public String getSize() {
        return size;
    }

    public int getFishYeild() {
        return fishYeild;
    }

    public int getMinWeight() {
        return minWeight;
    }

    public int getMaxWeight() {
        return maxWeight;
    }

    public int getServing() {
        return serving;
    }

    public void setFishName(String fishName) {
        this.fishName = fishName;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public void setFishYeild(int fishYeild) {
        this.fishYeild = fishYeild;
    }

    public void setMinWeight(int minWeight) {
        this.minWeight = minWeight;
    }

    public void setMaxWeight(int maxWeight) {
        this.maxWeight = maxWeight;
    }

    public void setServing(int serving) {
        this.serving = serving;
    }
}
