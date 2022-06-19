package com.samuksa.dto.fish.recommend.recommendResponse;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class FishRecommendInfo {
    private String fishName;

    private String area;

    private String areaFrom;

    private String farmType;

    private String size;
    private int price;

    private int minWeight;

    private int maxWeight;

    private int serving;

    public FishRecommendInfo(String fishName, String area, String areaFrom, String farmType, String size, int price, int minWeight, int maxWeight, int serving) {
        this.fishName = fishName;
        this.area = area;
        this.areaFrom = areaFrom;
        this.farmType = farmType;
        this.size = size;
        this.price = price;
        this.minWeight = minWeight;
        this.maxWeight = maxWeight;
        this.serving = serving;
    }

    public FishRecommendInfo(FishRecommendInfo fishRecommendInfo)
    {
        this.fishName = fishRecommendInfo.fishName;
        this.area = fishRecommendInfo.area;
        this.areaFrom = fishRecommendInfo.areaFrom;
        this.farmType = fishRecommendInfo.farmType;
        this.size = fishRecommendInfo.size;
        this.price = fishRecommendInfo.price;
        this.minWeight = fishRecommendInfo.minWeight;
        this.maxWeight = fishRecommendInfo.maxWeight;
        this.serving = fishRecommendInfo.serving;
    }
}
